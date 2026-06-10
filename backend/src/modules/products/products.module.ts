import { Module } from '@nestjs/common';

/**
 * Products Module
 *
 * Handles product catalog:
 * - Product CRUD operations
 * - Product categories
 * - Product images (admin review workflow)
 * - Product visibility (controlled by approval)
 *
 * Dependencies: Users
 * Dependents: Inventory, Cart, Wishlist, Orders, RFQ
 */
@Module({
  imports: [],
  controllers: [],
  providers: [],
  exports: [],
})
export class ProductsModule {}
