import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { OrdersModule } from './modules/orders/orders.module';
import { RfqModule } from './modules/rfq/rfq.module';

@Module({
  imports: [
    // Core infrastructure (imported globally)
    CoreModule,
    // Feature modules in dependency order
    AuthModule,
    UsersModule,
    ProductsModule,
    InventoryModule,
    OrdersModule,
    RfqModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
