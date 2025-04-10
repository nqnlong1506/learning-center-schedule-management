import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Logger } from './logger';
const process = dotenv.config().parsed;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: +process.MYSQL_PORT,
      username: process.MYSQL_USERNAME,
      password: process.MYSQL_PASSWORD,
      database: process.MYSQL_DATABASE,
      entities: ['dist/**/*.entity{.ts,.js}'],
      // synchronize: process.NODE_ENV == 'dev' ? true : false,
      // timezone: 'Asia/Seoul',
      logging: ['query', 'error', 'warn'],
      logger: new Logger(),
      maxQueryExecutionTime: 500,
    }),
  ],
})
export class MysqlModule {}
