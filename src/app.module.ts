import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MysqlModule } from './database/mysql/mysql.module';
import { AppModules } from './config/modules';
import { ThirdModules } from './config/third-modules';
import { TimeoutMiddleware } from './middlewares/timeout.middleware';
import { AppMiddleware } from './middlewares/app.middleware';
import { AuthMiddleware } from './middlewares/auth.middleware';

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
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'auth(.*)/login', method: RequestMethod.POST },
        { path: 'auth/refresh-token', method: RequestMethod.POST },
        { path: 'auth/register', method: RequestMethod.POST },
        { path: 'stock/list', method: RequestMethod.ALL },
        { path: 'stock/view', method: RequestMethod.ALL },
        { path: 'customer/(.*)', method: RequestMethod.ALL },
        { path: 'file/preview/(.*)', method: RequestMethod.GET },
        { path: 'file/download/(.*)', method: RequestMethod.GET },
        { path: 'v-sol-receiver/(.*)', method: RequestMethod.ALL },
        { path: 'sub-v-sol-receiver/(.*)', method: RequestMethod.ALL },
      )
      .forRoutes('*');
  }
}
