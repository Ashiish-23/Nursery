import { Module } from '@nestjs/common';

/**
 * RFQ (Request for Quotation) Module
 *
 * Handles RFQ workflows:
 * - Multi-nursery RFQ model
 * - RFQ creation and management
 * - Nursery quote responses
 * - No negotiation or quote revisions (immutable)
 * - Partial fulfillment allowed
 *
 * Critical Rules:
 * - One RFQ may contain multiple requested products
 * - Multiple nurseries can respond to same RFQ
 * - Inventory is NOT reserved during RFQ
 * - No quote revisions
 * - Buyer can cancel RFQ
 *
 * Dependencies: Products, Users
 * Dependents: Orders (when RFQ is accepted)
 */
@Module({
  imports: [],
  controllers: [],
  providers: [],
  exports: [],
})
export class RfqModule {}
