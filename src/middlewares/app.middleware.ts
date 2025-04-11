import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const { method, url } = req;
    const now = new Date();
    console.log(
      `\x1b[32m[Nest] [Request]  -\x1b[0m`,
      `\x1b[35m[${now.toUTCString()}]\x1b[0m`,
      `\x1b[33m[${method}]\x1b[0m`,
      url,
    );
    next();
  }
}
