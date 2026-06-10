import { Module } from '@nestjs/common';

/**
 * Inventory Module
 *
 * Handles inventory management:
 * - Stock management
 * - Inventory transactions (append-only, immutable)
 * - Stock validation rules
 * - Reserved quantity tracking
 *
 * Critical Rules:
 * - Inventory is the source of truth
 * - Stock can never be reduced below reserved quantity
 * - All changes must generate inventory_transactions
 * - inventory_transactions are append-only (no updates/deletes)
 *
 * Dependencies: Products
 * Dependents: Cart, Orders, RFQ
 */
@Module({
  imports: [],
  controllers: [],
  providers: [],
  exports: [],
})
export class InventoryModule {}
