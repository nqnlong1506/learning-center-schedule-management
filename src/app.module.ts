import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MysqlModule } from './database/mysql/mysql.module';
import { AppModules } from './config/modules';
import { ThirdModules } from './config/third-modules';
import { TimeoutMiddleware } from './middlewares/timeout.middleware';
import { AppMiddleware } from './middlewares/app.middleware';
import { SubVSolReceiverModule } from './third-party/sub-v-sol-receiver/sub-v-sol-receiver.module';
import { SubVSolSenderModule } from './third-party/sub-v-sol-sender/sub-v-sol-sender.module';
import { AuthMiddleware } from './middlewares/auth.middleware';

@Module({
  imports: [
    MysqlModule,
    ...AppModules,
    ...ThirdModules,
    SubVSolReceiverModule,
    SubVSolSenderModule,
  ],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TimeoutMiddleware).forRoutes('*');
    consumer
      .apply(AppMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
    // consumer
    //   .apply(AuthMiddleware)
    //   .exclude(
    //     { path: 'auth/login', method: RequestMethod.POST },
    //     { path: 'auth/refresh-token', method: RequestMethod.POST },
    //     { path: 'auth/register', method: RequestMethod.POST },
    //     { path: 'file/preview/(.*)', method: RequestMethod.GET },
    //     { path: 'file/download/(.*)', method: RequestMethod.GET },
    //     { path: 'v-sol-receiver/(.*)', method: RequestMethod.ALL },
    //   )
    //   .forRoutes('*');
  }
}
