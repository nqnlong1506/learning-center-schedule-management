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
      const {
        cho,
        topFilterType,
        vehicleFeatures,
        brands,
        colors,
        yearMin,
        yearMax,
        carPriceMin,
        carPriceMax,
        mileageMin,
        mileageMax,
        fuels,
      } = whereCondition;
      let numberPage = pageSize;
      const queryBuilder = this.stockRepository.createQueryBuilder('stock');
      queryBuilder.andWhere('stock.is_del = 0 ');
      if (cho) {
        queryBuilder.andWhere('stock.CHO = :cho', { cho });
      }
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
      if (brands) {
        const brandsArray = brands.split(',');
        queryBuilder.andWhere(
          new Brackets((qb) => {
            brandsArray.forEach((brand, index) => {
              qb.orWhere(`stock.BRAND LIKE :brand${index}`, {
                [`brand${index}`]: `%${brand}%`,
              });
            });
          }),
        );
      }
      if (colors) {
        const colorsArray = colors.split(',');
        queryBuilder.andWhere(
          new Brackets((qb) => {
            colorsArray.forEach((color, index) => {
              qb.orWhere(`stock.COLOR LIKE :color${index}`, {
                [`color${index}`]: `%${color}%`,
              });
            });
          }),
        );
      }
      if (yearMin) {
        queryBuilder.andWhere('stock.YEAR >= :yearMin', { yearMin: yearMin });
      }
      if (yearMax) {
        queryBuilder.andWhere('stock.YEAR <= :yearMax', { yearMax: yearMax });
      }
      if (carPriceMin || carPriceMax) {
        let condition = `CASE 
          WHEN stock.LIS_TYP = '01' THEN stock.CAR_ADP 
          WHEN stock.LIS_TYP = '02' THEN stock.CAR_ADP_HD 
          ELSE stock.CAR_ADP_WP 
          END`;
        if (carPriceMin) {
          queryBuilder.andWhere(`${condition} >= :carPriceMin`, {
            carPriceMin,
          });
        }
        if (carPriceMax) {
          queryBuilder.andWhere(`${condition} <= :carPriceMax`, {
            carPriceMax,
          });
        }
      }
      if (orderBy) {
        queryBuilder.orderBy(`stock.${orderBy}`, orderDirection || 'ASC');
      }
      if (mileageMin) {
        queryBuilder.andWhere('stock.MILEAGE >= :mileageMin', { mileageMin });
      }
      if (mileageMax) {
        queryBuilder.andWhere('stock.MILEAGE <= :mileageMax', { mileageMax });
      }
      if (fuels) {
        const fuelsArray = fuels.split(',');
        queryBuilder.andWhere(
          new Brackets((qb) => {
            fuelsArray.forEach((fuel, index) => {
              qb.orWhere(`stock.FUEL LIKE :fuel${index}`, {
                [`fuel${index}`]: `%${fuel}%`,
              });
            });
          }),
        );
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
