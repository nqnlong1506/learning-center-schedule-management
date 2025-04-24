import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
// import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    // private readonly authService: AuthService,
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
      const user = payload['user'];
      if (!user['no'] || !Number(user['no'])) {
        throw new Error('User does not provided');
      }
      // const isExist = await this.authService.isExistingUser(user['no']);
      // if (!isExist) {
      //   throw new Error('User does not provided');
      // }

      const now = Date.now();
      const expiry = payload['expiry'];
      if (expiry && now > expiry) {
        throw new Error('Session expired');
      }

      req['user_id'] = user['id'];
      req['user_no'] = user['no'];
      req['user_name'] = user['name'];
      next();
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
