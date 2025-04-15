import { AuthModule } from 'src/modules/auth/auth.module';
import { BuyModule } from 'src/modules/buy/buy.module';
import { CustomerModule } from 'src/modules/customer/customer.module';
import { SellModule } from 'src/modules/sell/sell.module';
import { StockModule } from 'src/modules/stock/stock.module';

export const AppModules = [
  CustomerModule,
  AuthModule,
  StockModule,
  BuyModule,
  SellModule,
];
