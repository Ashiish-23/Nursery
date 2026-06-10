import { Module } from '@nestjs/common';

/**
 * Orders Module
 *
 * Handles order management:
 * - Master orders (one checkout)
 * - Nursery-specific orders (multiple per checkout)
 * - Order items with price snapshots
 * - Order status management (append-only history)
 * - Address snapshots
 *
 * Architecture:
 * master_orders -> orders -> order_items
 *
 * One checkout creates:
 * - 1 Master Order
 * - Multiple Nursery Orders (one per nursery)
 * - Customer pays once, each nursery fulfills independently
 *
 * Dependencies: Products, Inventory, Users
 * Dependents: Payments, Logistics
 */
@Module({
  imports: [],
  controllers: [],
  providers: [],
  exports: [],
})
export class OrdersModule {}
