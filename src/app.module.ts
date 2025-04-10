import { Module } from '@nestjs/common';
import { MysqlModule } from './database/mysql/mysql.module';
import { AppModules } from './config/modules';

@Module({
  imports: [MysqlModule, ...AppModules],
  providers: [],
})
export class AppModule {}
