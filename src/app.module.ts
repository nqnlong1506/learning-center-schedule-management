import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MysqlModule } from './database/mysql/mysql.module';
import { AppModules } from './config/modules';
import { ThirdModules } from './config/third-modules';
import { TimeoutMiddleware } from './middlewares/timeout.middleware';
import { AppMiddleware } from './middlewares/app.middleware';

@Module({
  imports: [MysqlModule, ...AppModules, ...ThirdModules],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TimeoutMiddleware).forRoutes('*');
    consumer
      .apply(AppMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
