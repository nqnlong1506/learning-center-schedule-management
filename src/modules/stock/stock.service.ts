import { Injectable } from '@nestjs/common';
import { StockRepository } from './repositories/stock.repository';
import { CarFeatEnum, CarLisTyp, CarSummary } from 'src/config/enums/car';
import { Brackets } from 'typeorm';

@Injectable()
export class StockService {
  constructor(private readonly stockRepository: StockRepository) {}
  private convertFeatureStringToArray(featureString: string): string[] {
    if (!featureString) return [];

    const codeArray = featureString.split(',');
    return codeArray
      .map((code) => {
        return (
          Object.keys(CarFeatEnum).find(
            (key) => CarFeatEnum[key as keyof typeof CarFeatEnum] === code,
          ) || ''
        );
      })
      .filter(Boolean);
  }
  private convertFeatureNamesToCodes(featureNames: string): string[] {
    if (!featureNames) return [];

    const namesArray = featureNames.split(',');
    return namesArray
      .map((name) => CarFeatEnum[name as keyof typeof CarFeatEnum])
      .filter(Boolean);
  }
  async gets(query: {
    orderBy: string;
    orderDirection: 'ASC' | 'DESC';
    page: number;
    pageSize: number;
    whereCondition: Record<string, any>;
  }): Promise<any> {
    try {
      const { page, pageSize, orderBy, orderDirection, whereCondition } = query;
      const { topFilterType, vehicleFeatures } = whereCondition;
      let numberPage = pageSize;
      const queryBuilder = this.stockRepository.createQueryBuilder('stock');
      queryBuilder.andWhere('stock.is_del = 0 ');

      if (topFilterType) {
        switch (topFilterType) {
          case 'brand_certified': //브랜드인증중고
            queryBuilder.andWhere('stock.car_pro = :brandCer', {
              brandCer: CarSummary.BRAND_CER,
            });
            break;
          case 'rent_available': //렌트가능
            queryBuilder.andWhere('stock.car_pro = :rentAvailable', {
              rentAvailable: CarSummary.RENT_AVAILABLE,
            });
            break;
          case 'lease_transfer': //리스승계
            queryBuilder.andWhere('stock.car_pro = :leaseTransfer', {
              leaseTransfer: CarSummary.LEASE_TRANSFER,
            });
            break;
          case 'weekly_deal': //위클리 특가
            queryBuilder.andWhere(`stock.lis_typ = ${CarSummary.WEAKLY_DEAL}`);
            break;
        }
      }
      if (vehicleFeatures) {
        const featureCodes = this.convertFeatureNamesToCodes(vehicleFeatures);
        console.log('featureCodes', featureCodes);

        queryBuilder.andWhere(
          new Brackets((qb) => {
            featureCodes.forEach((code) => {
              qb.orWhere(`stock.CAR_FEAT LIKE :${code}`, {
                [code]: `%${code}%`,
              });
            });
          }),
        );
      }
      if (orderBy) {
        queryBuilder.orderBy(`stock.${orderBy}`, orderDirection || 'ASC');
      }
      queryBuilder.take(numberPage).skip((page - 1) * numberPage);
      const [data, totalCount] = await queryBuilder.getManyAndCount();
      const processedData = data.map((item) => {
        if (item.CAR_FEAT) {
          return {
            ...item,
            vehicleFeatures: this.convertFeatureStringToArray(item.CAR_FEAT),
          };
        }
        return item;
      });

      const totalPages = Math.ceil(totalCount / pageSize);
      return {
        data: processedData,
        attrs: {
          totalCount,
          totalPages,
          currentPage: Number(page),
        },
      };
    } catch (error) {
      throw error;
    }
  }
}
