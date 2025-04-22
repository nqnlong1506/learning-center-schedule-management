import { HttpStatus, Injectable } from '@nestjs/common';
import { StockRepository } from 'src/modules/stock/repositories/stock.repository';
import { HP_ST_001Dto } from '../dto/HP_ST_001.dto';
import { HP_CT_002Dto } from '../dto/HP_CT_002.dto';
import { BuyService } from 'src/modules/buy/buy.service';
import { CarHistoryModule } from 'src/modules/car-history/car-history.module';
import { CarHistoryService } from 'src/modules/car-history/services/car-history.service';

@Injectable()
export class VSolReceiverService {
  constructor(
    private readonly stockRepository: StockRepository,
    private readonly buyService: BuyService,
    private readonly carHistoryService: CarHistoryService,
  ) {}

  // HP_ST_001
  async createStock(data: HP_ST_001Dto, keyTrans?: string) {
    const key = keyTrans ?? (await this.stockRepository.startTransaction());
    try {
      const { STOCK, WARRANTY } = data;
      console.log('createStock', STOCK, WARRANTY);
      await this.stockRepository.createEntity(STOCK, key);
      //call autobegins
      await this.createAutobegins(STOCK.CAR_REG_NO, STOCK.OWNER, key);

      //call carhistory
      await this.createCarHistory(STOCK.CAR_REG_NO, key);

      if (!keyTrans) await this.stockRepository.commitTransaction(key);
    } catch (error) {
      if (!keyTrans) await this.stockRepository.rollbackTransaction(key);
      throw error;
    }
  }

  // HP_ST_002
  async createAutobegins(carRegNo: string, owner: string, keyTrans?: string) {
    const key = keyTrans ?? (await this.stockRepository.startTransaction());
    try {
      console.log('createAutobegins', carRegNo, owner);

      // save log
      if (!keyTrans) await this.stockRepository.commitTransaction(key);
    } catch (error) {
      if (!keyTrans) await this.stockRepository.rollbackTransaction(key);
      throw error;
    }
  }

  // HP_ST_003
  async createCarHistory(carRepNo: string, keyTrans?: string) {
    const key = keyTrans ?? (await this.stockRepository.startTransaction());
    try {
      console.log('createCarHistory', carRepNo);
      await this.carHistoryService.create(carRepNo, key);
      // save log
      if (!keyTrans) await this.stockRepository.commitTransaction(key);
    } catch (error) {
      if (!keyTrans) await this.stockRepository.rollbackTransaction(key);
      throw error;
    }
  }
  // HP_CT_002
  async updateBuy(data: HP_CT_002Dto) {
    const key = await this.stockRepository.startTransaction();
    try {
      const { STOCK, WARRANTY } = data;
      const dataUpdate = {
        vin: STOCK.VIN,
        carRegNo: STOCK.CAR_REG_NO,
        contNo: STOCK.CONT_NO,
        statCd: STOCK.STAT_CD,
      };
      await this.buyService.update(dataUpdate);
      await this.stockRepository.commitTransaction(key);
    } catch (error) {
      console.log('error', error);
      await this.stockRepository.rollbackTransaction(key);
      throw error;
    }
  }
}

// @Injectable()
// export class VSolAuthService {
//   constructor(private readonly stockRepository: StockRepository) {}

//   public getToken(id: string, secretKey: string) {
//     if (!id)
//       return {
//         success: false,
//         response: 'Unauthorized because your id is NULL',
//         statusCode: HttpStatus.UNAUTHORIZED,
//       };
//     if (!secretKey)
//       return {
//         success: false,
//         response: 'Unauthorized because your secretKey is NULL',
//         statusCode: HttpStatus.UNAUTHORIZED,
//       };
//     if (id != 'trade') {
//       return {
//         success: false,
//         response: `Unauthorized because your id ("${id}") not correct`,
//         statusCode: HttpStatus.UNAUTHORIZED,
//       };
//     }
//     try {
//       const realSecretKet = this.base64OpenSSLDecrypt(secretKey);
//       if (config.security.tradeSecretKey != realSecretKet) {
//         return {
//           success: false,
//           response: `Unauthorized because your secret_key ("${config.security.tradeSecretKey}") not like real secret key`,
//           statusCode: HttpStatus.UNAUTHORIZED,
//         };
//       }
//     } catch (error) {
//       return {
//         success: false,
//         response: `Unauthorized because your secret_key ("${config.security.tradeSecretKey}") can not decrypt`,
//         error: error.message,
//         statusCode: HttpStatus.UNAUTHORIZED,
//       };
//     }

//     const tradeJWT = this.encodeAuthToken({
//       iss: 'hanbiro',
//       HANBIRO_GW: btoa(config.security.tradeAccess),
//     });

//     return {
//       success: true,
//       accessToken: tradeJWT,
//       tokenType: 'Bearer',
//       statusCode: HttpStatus.OK,
//     };
//   }
//   public base64OpenSSLDecrypt(secret: string) {
//     const password = config.security.tradePassword;
//     const decodedSecretKey = Buffer.from(secret, 'base64');
//     const iv = Buffer.alloc(0);
//     const decipher = crypto.createDecipheriv(
//       config.security.tradeSSLEncryptCipherAlgo,
//       Buffer.from(password, 'utf8'),
//       iv,
//     );
//     let decrypted = decipher.update(decodedSecretKey, null, 'utf8');
//     decrypted += decipher.final('utf8');
//     return decrypted;
//   }
// }
