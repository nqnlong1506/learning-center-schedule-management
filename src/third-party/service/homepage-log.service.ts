import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Logger } from 'src/database/mysql/logger';

@Injectable()
export class HomepageLog implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const handler = context.getHandler();
    const logPath = this.reflector.get<string>('logPath', handler);
    const logger = new Logger();
    const data_log = {
      HEADER: request.headers,
      DATA: request.body,
    };
    logger.logHomepagePre(logPath, JSON.stringify(data_log));
    return next.handle();
  }
}
