import { AuthModule } from 'src/modules/auth/auth.module';
import { CustomerModule } from 'src/modules/customer/customer.module';
import { StockModule } from 'src/modules/stock/stock.module';

export const AppModules = [CustomerModule, AuthModule, StockModule];
