import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      // next();
      // return;
      const authorization = req.headers['authorization'];
      const str = authorization?.toString().split(' ');
      if (!str || !Array.isArray(str) || str[0] !== 'Bearer') {
        throw new Error('Your authenrizatoin must begin with Bearer');
      }
      const token = str[1];
      const payload = await this.jwtService.verifyAsync(token);
      const customer = payload['customer'];
      if (!customer['no'] || !Number(customer['no'])) {
        throw new Error('customer does not provided');
      }
      const isExist = await this.authService.isExistingCustomer(customer['no']);
      if (!isExist) {
        throw new Error('customer does not provided');
      }

      const now = Date.now();
      const expiry = payload['expiry'];
      if (expiry && now > expiry) {
        throw new Error('Session expired');
      }

      req['customer_id'] = customer['id'];
      req['customer_no'] = customer['no'];
      req['customer_name'] = customer['name'];
      next();
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
