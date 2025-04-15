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
    // const accident_info_data = data['r502'];
    // if (accident_info_data?.length > 0) {
    //   const keys = ['도장', '탈착', '교환', '판금', '수리'];
    //   accident_info_data.forEach((accValue: string, accKey: number) => {
    //     if (!accValue['r502-16']) return;
    //     const valArr = accValue['r502-16'].split(',');
    //     if (valArr.length > 0) {
    //       accident_info_data[accKey]['r502-16'] = [[], [], [], [], [], []];
    //       valArr.forEach((v: string) => {
    //         let check = false;
    //         keys.forEach((value, key) => {
    //           if (v.includes(`(${value})`)) {
    //             check = true;
    //             // if(accident_info_data['accKey']['r502-16']['key'] != ""){
    //             //   accident_info_data['accKey']['r502-16']['key'] =
    //             // }
    //             accident_info_data[accKey]['r502-16'][key].push(v);
    //           }
    //         });
    //         if (check === false) {
    //           accident_info_data[accKey]['r502-16'][5].push(v);
    //         }
    //       });
    //     }
    //   });
    // }
    data.owner_change_data = owner_change_data;
    // data.accident_info_data = accident_info_data;
    return data;
  }
  async sync(carRegNo: string): Promise<any> {
    await this.create(carRegNo);
    return true;
  }
  // async createTest(carRegNo: string): Promise<any> {
  //   try {
  //     const carHistoryData = await this.callToCarHistory(carRegNo);
  //     if (carHistoryData?.r000 != '000') {
  //       console.log('No data', carRegNo);
  //       carHistoryData.r002 = carRegNo;
  //     }
  //     console.log('Data', carRegNo);
  //     const jsonArr = [
  //       'r113',
  //       'r202',
  //       'r203',
  //       'r205',
  //       'r406',
  //       'r408',
  //       'r410',
  //       'r502',
  //       'r511',
  //       'r602',
  //     ];
  //     jsonArr.forEach((field) => {
  //       if (carHistoryData[field]) {
  //         carHistoryData[field] = JSON.stringify(carHistoryData[field]);
  //       }
  //     });
  //     const savedCarHistory =
  //       await this.carHistoryRepository.save(carHistoryData);
  //     return savedCarHistory;
  //   } catch (error) {
  //     Logger.error(error);
  //     throw error;
  //   }
  // }
  // async syncArr(): Promise<any> {
  //   try {
  //     const carRegNoList = [
  //       '48마6084',
  //       '348라1274',
  //       '348라1274',
  //       '152호6759',
  //       '16러5631',
  //       '348라1274',
  //       '28두3168',
  //       '149모2453',
  //       '167노3534',
  //       '163더3213',
  //       '94어5502',
  //       '304더test',
  //       '35가8068',
  //       '304더tes3',
  //       '304더tes4',
  //       '347고7904',
  //       '169어3298',
  //       '334부1708',
  //       '47머4924',
  //       '345가9770',
  //       '59저8524',
  //       '398노9968',
  //       '18나8014',
  //       '257저9953',
  //       '263오1317',
  //       '167나1475',
  //       '04수3967',
  //       '197소5002',
  //       '378무6243',
  //       '36더0636',
  //       '17누6314',
  //       '28마5255',
  //       '335수1555',
  //       '58소5862',
  //       '07더9273',
  //       '69서2219',
  //       '276부5973',
  //       '42너8047',
  //       '24우0289',
  //       '26거5024',
  //       '58저0541',
  //       '06오7721',
  //       '21부3629',
  //       '27조4315',
  //       '176호2395',
  //       '225부9948',
  //       '62수1758',
  //       '312수7242',
  //       '360서2597',
  //       '26가0307',
  //       '29소6982',
  //       '159조2798',
  //       '182모4071',
  //       '389우6186',
  //       '38어3692',
  //       '806라8425',
  //       '167더7429',
  //       '379주7427',
  //       '26버5309',
  //       '344라5331',
  //       '319모8774',
  //       '66거1811',
  //       '346가4003',
  //       '204로2813',
  //       '163호7335',
  //       '38보4267',
  //       '49다5434',
  //       '07더9273',
  //       '51하5468',
  //       '36호2680',
  //       '146오3959',
  //       '319모8774',
  //       '356고4787',
  //       '230조9296',
  //       '24우0289',
  //       '07더9273',
  //       '58저0541',
  //       '326거1525',
  //       '204로2813',
  //       '397보8479',
  //       '184고1580',
  //       '178로9340',
  //       '398고6371',
  //       '69어6307',
  //       '112너2919',
  //       '386도7959',
  //       '36루9384',
  //       '143오3126',
  //       '175머7471',
  //       '290우8598',
  //       '159하1191',
  //       '152호7712',
  //       '220호1897',
  //       '126하6201',
  //       '126호7628',
  //       '130하2012',
  //       '152호7581',
  //       '152호7515',
  //       '159하2692',
  //       '159호5458',
  //       '152호5450',
  //       '152호7449',
  //       '152호7492',
  //       '159호6974',
  //       '159호5532',
  //       '159하3288',
  //       '152호5695',
  //       '159호3946',
  //       '220호1895',
  //       '152호5060',
  //       '159하1049',
  //       '152호8134',
  //       '159호5023',
  //       '220호1891',
  //       '08호6631',
  //       '152호7812',
  //       '143호5380',
  //       '152호7866',
  //       '152호8055',
  //       '126하7848',
  //       '23호8422',
  //       '159하3462',
  //       '152호7804',
  //       '60하7585',
  //       '152호7867',
  //       '152호7849',
  //       '36호2692',
  //       '152호7767',
  //       '23하5298',
  //       '152호8040',
  //       '152호2227',
  //       '152호1615',
  //       '159호5533',
  //       '159호5325',
  //       '152호7856',
  //       '122호9251',
  //       '159하3379',
  //       '163호4043',
  //       '159호5139',
  //       '152호3413',
  //       '152호2371',
  //       '152호2372',
  //       '159하3412',
  //       '152호7816',
  //       '126호3683',
  //       '159하3413',
  //       '159하3412',
  //       '159하3389',
  //       '143하5998',
  //       '152호7852',
  //       '159하1627',
  //       '152호7394',
  //       '152호5642',
  //       '152호7816',
  //       '83라2477',
  //       '111머6513',
  //       '308가8136',
  //       '19무6868',
  //       '149소9189',
  //       '309머7284',
  //       '02버4769',
  //       '195부2804',
  //       '156노1236',
  //       '167무9682',
  //       '68다2956',
  //       '38저7428',
  //       '309다4921',
  //       '254저6889',
  //       '34저1202',
  //       '16어9948',
  //       '260누8275',
  //       '126호7623',
  //       '152호5648',
  //       '159하1416',
  //       '143호8089',
  //       '159호5672',
  //       '152호8594',
  //       '126하2007',
  //       '126호7535',
  //       '152호8220',
  //       '152호7051',
  //       '35우7277',
  //       '159하1452',
  //       '159하3944',
  //       '50서9180',
  //       '209고2423',
  //       '126하1604',
  //       '328무5458',
  //       '360도4773',
  //       '159하3728',
  //       '126하1126',
  //       '159하1436',
  //       '159하3719',
  //       '193호6599',
  //       '152하2200',
  //       '126호6152',
  //       '63어9763',
  //       '36마3881',
  //       '348저3522',
  //       '159하3790',
  //       '152호8492',
  //       '126하2083',
  //       '159하1473',
  //       '152호9748',
  //       '159호7535',
  //       '125호1037',
  //       '02구1392',
  //       '171마8377',
  //       '126호5089',
  //       '38두9568',
  //       '152호8582',
  //       '152호8545',
  //       '138머7323',
  //       '159하3952',
  //       '159하3600',
  //       '152호8646',
  //       '159호5871',
  //       '71하2582',
  //       '126호9317',
  //       '152호9664',
  //       '159호5794',
  //       '159호6306',
  //       '159하3398',
  //       '59서7460',
  //       '140보3611',
  //       '143호7121',
  //       '159호6126',
  //       '38두9568',
  //       '326무2927',
  //       '20주4507',
  //       '45너1444',
  //       '09다8396',
  //       '159호5926',
  //       '159하3959',
  //       '159호5887',
  //       '152호8720',
  //       '143호7142',
  //       '159호5947',
  //       '159하3831',
  //       '159하3824',
  //       '159하1524',
  //       '152호6864',
  //       '159하3834',
  //       '152하2464',
  //       '159하3849',
  //       '152호6554',
  //       '159호3954',
  //       '159호5889',
  //       '152하1143',
  //       '159호6192',
  //       '159호6378',
  //       '38머2909',
  //       '13저8027',
  //       '15오2169',
  //       '170허2865',
  //       '144머4154',
  //       '41모8350',
  //       '159호5985',
  //       '290우8526',
  //       '127마5893',
  //       '10노5019',
  //       '159호5974',
  //       '159호5992',
  //       '152호9085',
  //       '163하2518',
  //       '163호1395',
  //       '290서9871',
  //       '20러6940',
  //       '159호6012',
  //       '71하2556',
  //       '152호6864',
  //       '126호5149',
  //       '228루9032',
  //       '159하2394',
  //       '38러7983',
  //       '275누4184',
  //       '159호6064',
  //       '159호6069',
  //       '159호6048',
  //       '159호6729',
  //       '143호7493',
  //       '152호8941',
  //       '159하3830',
  //       '152호8971',
  //       '152호8908',
  //       '46더0636',
  //       '163호1334',
  //       '122호9291',
  //       '152호3171',
  //       '159하9469',
  //       '33하2723',
  //       '36호2640',
  //       '152호1929',
  //       '163호1232',
  //       '122호9293',
  //       '159하8771',
  //       '159호8610',
  //       '122호9312',
  //       '159하8616',
  //       '159하8136',
  //       '36호2637',
  //       '55마2676',
  //       '399조3495',
  //       '152호8974',
  //       '143호7758',
  //       '159호5983',
  //       '110오8617',
  //       '384러9216',
  //       '54라1467',
  //       '154머7452',
  //       '66누1768',
  //       '219도5695',
  //       '106두3730',
  //       '126하2279',
  //       '34오8150',
  //       '15무3073',
  //       '11가7340',
  //       '305고1400',
  //       '46저8030',
  //       '42두9119',
  //       '67주4390',
  //       '36가5722',
  //       '50주3207',
  //       '319소3211',
  //       '15고0242',
  //       '56조3912',
  //       '146소4167',
  //       '159하1725',
  //       '126호5221',
  //       '159호3153',
  //       '159호3045',
  //       '60오9448',
  //       '152하1757',
  //       '152하1121',
  //       '152호5148',
  //       '159호7285',
  //       '45주3557',
  //       '159호6453',
  //       '152호9514',
  //       '63어7947',
  //       '108어7188',
  //       '41가4427',
  //       '43거5511',
  //       '31도3556',
  //       '102루2593',
  //       '50어9637',
  //       '48보1753',
  //       '52어8694',
  //       '152하1147',
  //       '159하2403',
  //       '32러5120',
  //       '152호9385',
  //       '141가5837',
  //       '24머7205',
  //       '162수5070',
  //       '30오0236',
  //       '322고4756',
  //       '18다6548',
  //       '19오0946',
  //       '67가0433',
  //       '27어9315',
  //       '159하1728',
  //       '159호6659',
  //       '152호9141',
  //       '13서2905',
  //       '58로0825',
  //       '159호6353',
  //       '159호3276',
  //       '287서7417',
  //       '05수4153',
  //       '62다1462',
  //       '27거7082',
  //       '31호1889',
  //       '152호9578',
  //       '152하1179',
  //       '152호9512',
  //       '152호9484',
  //       '206가9103',
  //       '138머7318',
  //       '15더7136',
  //       '106조5197',
  //       '18다7126',
  //       '183도9623',
  //       '159하6398',
  //       '159호8131',
  //       '152호9118',
  //       '193호6599',
  //       '206가9166',
  //       '163호1639',
  //       '152호9544',
  //       '159호8637',
  //       '60하3894',
  //       '152호2856',
  //       '152하1133',
  //       '159호6236',
  //       '159호3048',
  //       '08어0856',
  //       '58우5065',
  //       '159호6563',
  //       '152호3893',
  //       '126호5204',
  //       '163호1568',
  //       '159호8639',
  //       '152호9557',
  //       '152호9656',
  //       '159호3434',
  //       '713호1171',
  //       '152호7997',
  //       '159하3351',
  //       '152호3592',
  //       '159호6609',
  //       '152하1236',
  //       '143호8136',
  //       '42고6770',
  //       '159호6604',
  //       '152호5942',
  //       '197호5026',
  //       '152호9662',
  //       '152호9667',
  //       '159호7592',
  //       '152호9706',
  //       '159호6620',
  //       '152호3776',
  //       '152하1630',
  //       '152호9878',
  //       '152하1230',
  //       '152호9640',
  //       '152호9660',
  //       '152하1760',
  //       '159호3243',
  //       '152호9134',
  //       '159하1816',
  //       '159하1814',
  //       '143호1350',
  //       '152하1323',
  //       '159하1788',
  //       '143호8716',
  //       '143호1350',
  //       '152하1357',
  //       '152호9856',
  //       '159하1826',
  //       '152하1335',
  //       '159호6794',
  //       '126하6127',
  //       '31서3373',
  //       '03허0663',
  //       '360무6204',
  //       '148모8024',
  //       '159호6245',
  //       '159호6986',
  //       '126호6255',
  //       '126하1713',
  //       '159호7282',
  //       '63라4873',
  //       '67도4360',
  //       '60노3837',
  //       '20주0560',
  //       '159하1845',
  //       '159호6818',
  //       '159호7043',
  //       '53모6006',
  //       '368고3861',
  //       '282누5810',
  //       '40나7159',
  //       '238서1947',
  //       '152하1396',
  //       '159호6866',
  //       '159하1851',
  //       '20우3727',
  //       '152하1398',
  //       '159호6923',
  //       '238서1947',
  //       '162허4238',
  //       '55더6457',
  //       '206가9166',
  //       '159하3707',
  //       '152호3857',
  //       '159호3294',
  //       '126호5174',
  //       '143호8235',
  //       '161두6317',
  //       '110마5841',
  //       '152호9957',
  //       '152호9997',
  //       '152하1390',
  //       '152호3518',
  //       '152호9920',
  //       '208루1877',
  //       '175오1487',
  //       '152호3671',
  //       '26마2302',
  //       '46루9138',
  //       '42루7866',
  //       '58두7473',
  //       '152호3546',
  //       '152호2500',
  //       '152호2468',
  //       '216무6485',
  //       '163호4981',
  //       '159호7084',
  //       '152하1468',
  //       '114다3351',
  //       '230나9330',
  //       '33오5133',
  //       '152하1419',
  //       '159호7721',
  //       '63머7903',
  //       '34호8450',
  //       '34호3597',
  //       '160허3130',
  //       '20호6448',
  //       '21어0868',
  //       '16저2101',
  //       '152호3602',
  //       '221하1590',
  //       '152호3602',
  //       '125호4147',
  //       '125호1845',
  //       '348모3827',
  //       '138마6799',
  //       '174어3072',
  //       '197호5392',
  //       '152호5246',
  //       '152호3628',
  //       '159하1901',
  //       '359누6680',
  //       '159호6867',
  //       '51루6128',
  //       '66구0135',
  //       '14두9711',
  //       '32부4614',
  //       '32부3245',
  //       '152하1514',
  //       '152호3731',
  //       '363모9585',
  //       '174조8310',
  //       '356머6467',
  //       '302더8830',
  //       '365모3898',
  //       '335루1741',
  //       '160두8044',
  //       '257무7721',
  //       '223소4137',
  //       '368누7428',
  //       '126버7136',
  //       '217보2928',
  //       '267모7158',
  //       '314우7720',
  //       '223소4128',
  //       '235오9487',
  //       '223소4148',
  //       '223소4147',
  //       '257무7754',
  //       '371수6457',
  //       '314러6056',
  //       '396보7687',
  //       '185도4961',
  //       '355도2270',
  //       '138구9584',
  //       '278라8525',
  //       '373로8351',
  //       '133보2176',
  //       '180거1653',
  //       '370저6095',
  //       '271조1828',
  //       '17오4553',
  //       '313다9709',
  //       '50모2965',
  //       '06노0117',
  //       '36오3322',
  //       '52누7380',
  //       '01저6078',
  //       '57너9922',
  //       '57두4785',
  //       '19버7440',
  //       '170하4985',
  //       '07마0983',
  //       '195머6602',
  //       '131보2804',
  //       '212가5166',
  //       '167더7463',
  //       '115부8488',
  //       '143거2580',
  //       '15허8300',
  //       '193호8358',
  //       '159호6518',
  //       '143호1039',
  //       '126하2881',
  //       '152호9166',
  //       '159하9173',
  //       '43무9750',
  //       '49노4090',
  //       '223소4113',
  //       '183러4507',
  //       '170허1017',
  //       '162허4072',
  //       '162허4005',
  //       '191허7688',
  //       '170허1416',
  //       '170허1805',
  //       '170하3753',
  //       '176부3521',
  //       '52가7998',
  //       '124고9639',
  //       '280고2240',
  //       '354저2760',
  //       '156저1315',
  //       '362다7347',
  //       '158나2270',
  //       '199너9447',
  //       '06라8415',
  //       '29라7091',
  //       '45조0226',
  //       '12모5927',
  //       '180오1572',
  //       '265로6760',
  //       '123러8630',
  //       '163가5804',
  //       '170허7681',
  //       '170허4419',
  //       '162마6608',
  //       '135조7754',
  //       '238너5215',
  //       '212구6480',
  //       '182머4109',
  //       '67저2358',
  //       '206부1132',
  //       '195가9065',
  //       '365너9241',
  //       '63로9236',
  //       '169러9458',
  //       '223소4141',
  //       '68구8486',
  //       '330무5455',
  //       '334수3102',
  //       '398고6396',
  //       '160라5491',
  //       '101하1610',
  //       '10수2462',
  //       '314조7594',
  //       '67무2246',
  //       '300주8214',
  //       '388서9803',
  //       '20로4301',
  //       '28거9159',
  //       '06누1126',
  //       '144두2283',
  //       '30허0592',
  //       '20호9568',
  //       '169허2536',
  //       '302수2307',
  //       '30허0558',
  //       '169허2523',
  //       '69주6439',
  //       '370주3322',
  //       '335오9450',
  //       '10호8889',
  //       '158라5552',
  //       '121하2556',
  //       '137마8399',
  //       '170하8856',
  //       '61노2785',
  //       '49모2710',
  //       '07마0225',
  //       '156거6536',
  //       '101호8635',
  //       '340모2222',
  //       '153조8344',
  //       '69마8017',
  //       '135노5288',
  //       '28저3158',
  //       '237도4950',
  //       '108노7416',
  //       '160주2759',
  //       '170하7309',
  //       '144어9614',
  //       '200부3603',
  //       '06로4860',
  //       '49오4721',
  //       '39모3583',
  //       '166허9310',
  //       '173호6181',
  //       '146하1030',
  //       '359누6680',
  //       '317마3254',
  //       '116소4203',
  //     ];
  //     const uniqueArr = [...new Set(carRegNoList)];

  //     for (const carRegNo of uniqueArr) {
  //       await this.createTest(carRegNo);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // }
}
