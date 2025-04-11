import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TimeoutMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const timeout = setTimeout(
      () => {
        if (!res.headersSent) {
          res.status(408).json({
            success: false,
            message: 'Request timeout',
          });
        }
      },
      5 * 60 * 1000,
    );
    res.on('finish', () => clearTimeout(timeout));
    next();
  }
}
