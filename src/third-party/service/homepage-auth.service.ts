// import {
//   CanActivate,
//   ExecutionContext,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { config } from 'dotenv';

// export class TradeAuthGuard implements CanActivate {
//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();

//     const token = this.extractTokenFromHeader(request);

//     // return true
//     const check = this.checkTradeJWT(token);
//     if (!check) {
//       throw new UnauthorizedException();
//     }

//     return true;
//   }

//   private checkTradeJWT(token: string) {
//     const result: any = this.decodeAuthToken(token);
//     const key = atob(result?.HANBIRO_GW);
//     // this.userNo = getUserNoByID(result.iss)['no']
//     if (key === config.security.tradeAccess) {
//       return true;
//     } else {
//       return false;
//     }
//   }

//   private extractTokenFromHeader(request: Request): string | undefined {
//     const token = request.body?.HEADER.ACCESS_TOKEN as string;
//     return token || undefined;
//   }
//   private decodeAuthToken(authToken: string) {
//     const secretKey = config.security.globalJWTSecret;
//     const decodedToken = jwt.verify(authToken, secretKey, {
//       algorithms: ['HS256'],
//     });
//     return decodedToken;
//   }
// }
