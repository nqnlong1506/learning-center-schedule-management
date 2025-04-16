import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { CarHistoryRepository } from '../repositories/car-history.repository';
import { carHistoryError, config } from '../config';
import { seed_encrypt } from '../SEED/seed';
import { CarHistoryEntity } from '../entities/car-history.entity';

@Injectable()
export class CarHistoryService {
  constructor(private readonly carHistoryRepository: CarHistoryRepository) {}

  async get(where: Record<string, any>): Promise<any> {
    try {
      let result = await this.carHistoryRepository.get(where);

      if (result) {
        result = await this.parseData(result);
      }
      return result;
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
  async create(carRegNo: string, keyTrans?: string): Promise<any> {
    const key =
      keyTrans ?? (await this.carHistoryRepository.startTransaction());
    try {
      const carHistory = await this.carHistoryRepository.findOne({
        where: { r002: carRegNo },
      });
      let savedCarHistory: CarHistoryEntity;
      // const carHistoryData = await this.getDataFrom3rd(carRegNo);
      const carHistoryData = await this.callToCarHistory(carRegNo);
      const jsonArr = [
        'r113',
        'r202',
        'r203',
        'r205',
        'r406',
        'r408',
        'r410',
        'r502',
        'r511',
        'r602',
      ];
      jsonArr.forEach((field) => {
        if (carHistoryData[field]) {
          carHistoryData[field] = JSON.stringify(carHistoryData[field]);
        }
      });
      if (carHistoryData?.r000 != '000') {
        carHistoryData.r002 = carRegNo;
        carHistoryData.errorMessage = carHistoryError[carHistoryData.r000];
      }
      if (carHistory) {
        savedCarHistory = await this.carHistoryRepository.updateEntity(
          { r002: carRegNo },
          { ...carHistoryData, errorMessage: null },
          key,
        );
      } else {
        savedCarHistory = await this.carHistoryRepository.createEntity(
          carHistoryData,
          key,
        );
      }
      if (!keyTrans) await this.carHistoryRepository.commitTransaction(key);
      return savedCarHistory;
    } catch (error) {
      Logger.error(error);
      if (!keyTrans) await this.carHistoryRepository.rollbackTransaction(key);
      throw error;
    }
  }
  private formatDataFormOutSide(carHistory: any) {
    const formatField = ['r511-01', 'r406-01', 'r408-01', 'r410-01'];
    const jsonArr = [
      'r113',
      'r202',
      'r203',
      'r205',
      'r406',
      'r408',
      'r410',
      'r502',
      'r602',
    ];

    jsonArr.forEach((field) => {
      if (carHistory[field]) {
        carHistory[field] = JSON.stringify(carHistory[field]);
      }
    });

    formatField.forEach((field) => {
      if (carHistory[field]) {
        const currentField = field.split('-')[0];
        const formatData = {
          [field]: carHistory[field],
        };
        carHistory[currentField] = JSON.stringify(formatData);
      }
      carHistory[field] = undefined;
    });

    return carHistory;
  }
  async save({ carHistory }: { carHistory: any }) {
    try {
      carHistory = this.formatDataFormOutSide(carHistory);
      const savedCarHistory = await this.carHistoryRepository.save(carHistory);

      return savedCarHistory;
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
  async update({ carHistory }: { carHistory: any }) {
    try {
      carHistory = this.formatDataFormOutSide(carHistory);
      const savedCarHistory = await this.carHistoryRepository.update(
        { r002: carHistory.r002 },
        carHistory,
      );

      return savedCarHistory;
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
  async callToCarHistory(carRegNo: string): Promise<any> {
    try {
      const sType_return = seed_encrypt(
        config.carHistory.kisaIvKey,
        config.carHistory.kisaUserkey,
        '1',
      );
      const memberID_return = seed_encrypt(
        config.carHistory.kisaIvKey,
        config.carHistory.kisaUserkey,
        config.carHistory.carHistoryKey,
      );
      const carnum_return = seed_encrypt(
        config.carHistory.kisaIvKey,
        config.carHistory.kisaUserkey,
        carRegNo.trim(),
      );
      const formData = new FormData();
      formData.append('joinCode', config.carHistory.carHistoryKey);
      formData.append('sType', sType_return);
      formData.append('memberID', memberID_return);
      formData.append('carnum', carnum_return);
      formData.append('carNumType', '0');
      formData.append('stdDate', '');
      formData.append('malsoGb', '');
      formData.append('rType', 'J');
      const HEADER = {
        'Content-Type': 'multipart/form-data',
      };

      const { data } = await axios.post(
        config.carHistory.carHistoryURL,
        formData,
        { headers: HEADER },
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
  async getDataFrom3rd(carRegNo: string): Promise<any> {
    try {
      const data = await this.callToCarHistory(carRegNo);
      if (data?.r000 == '000') {
        return await this.convert(data);
      } else {
        throw new Error(`${carHistoryError[data.r000]}`);
      }
    } catch (error) {
      throw error;
    }
  }
  async parseData(data: Record<string, any>): Promise<any> {
    const jsonArr = [
      'r113',
      'r202',
      'r203',
      'r205',
      'r406',
      'r408',
      'r410',
      'r502',
      'r511',
      'r602',
    ];
    jsonArr.forEach((field) => {
      if (data[field]) {
        data[field] = JSON.parse(data[field]);
      }
    });
    return this.convert(data);
  }
  async convert(data: Record<string, any>): Promise<any> {
    const parseR20505 = ['관용', '자가용', '영업용', '개인택시'];
    const owner_change_data = [];

    if (data?.r205?.length > 0) {
      data.r205.forEach((item: string) => {
        if (item['r205-01'] === '04') {
          owner_change_data.push({
            r205_02: item['r205-02'],
            r205_01: item['r205-01'],
            r202_05: parseR20505[item['r202-05']],
            r202_04: '',
          });
        }
      });
    }
    if (data?.r202?.length > 0) {
      data.r202.forEach((item: string) => {
        if (item['r202-01'] === '02') {
          owner_change_data.push({
            r205_02: item['r202-02'],
            r205_01: item['r205-01'],
            r202_05: parseR20505[item['r202-05']],
            r202_04: item['r202-03'],
          });
        }
      });
    }
    data.owner_change_data = owner_change_data;
    return data;
  }
  async sync(carRegNo: string): Promise<any> {
    await this.create(carRegNo);
    return true;
  }
}
