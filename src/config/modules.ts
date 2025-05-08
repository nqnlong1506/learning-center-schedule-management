import { AuthModule } from 'src/modules/auth/auth.module';
import { AutobeginModule } from 'src/modules/autobegin/autobegin.module';
import { BuyModule } from 'src/modules/buy/buy.module';
import { CarHistoryModule } from 'src/modules/car-history/car-history.module';
import { CustomerModule } from 'src/modules/customer/customer.module';
import { ProductGroupModule } from 'src/modules/product-group/product-group.module';
import { SellModule } from 'src/modules/sell/sell.module';
import { StockModule } from 'src/modules/stock/stock.module';
import { VendorModule } from 'src/modules/vendor/vendor.module';

export const AppModules = [
  CustomerModule,
  AuthModule,
  StockModule,
  BuyModule,
  SellModule,
  CarHistoryModule,
  AutobeginModule,
  VendorModule,
  ProductGroupModule,
];
