import { HttpStatus, Injectable } from '@nestjs/common';
import { StockRepository } from 'src/modules/stock/repositories/stock.repository';
import { HP_ST_001Dto } from '../dto/HP_ST_001.dto';

@Injectable()
export class VSolReceiverService {
  constructor(private readonly stockRepository: StockRepository) {}

  // HP_ST_001
  async createStock(data: HP_ST_001Dto) {
    const key = await this.stockRepository.startTransaction();
    try {
      const { STOCK, WARRANTY } = data;
      await this.stockRepository.createEntity(STOCK, key);
      await this.stockRepository.commitTransaction(key);
    } catch (error) {
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
