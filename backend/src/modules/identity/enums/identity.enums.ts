/**
 * Identity Domain — Canonical Enums & Permission Baseline
 *
 * Mirrors approved Prisma enums in schema.prisma.
 * Permission matrix is application-level (not persisted in database).
 */

export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  NURSERY_OWNER = 'NURSERY_OWNER',
  BUSINESS = 'BUSINESS',
  ADMIN = 'ADMIN',
}

export enum AccountStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  DEACTIVATED = 'DEACTIVATED',
  ARCHIVED = 'ARCHIVED',
}

export enum OnboardingStatus {
  NOT_STARTED = 'NOT_STARTED',
  PROFILE_INCOMPLETE = 'PROFILE_INCOMPLETE',
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
  COMPLETED = 'COMPLETED',
}

export const PERMISSIONS = {
  PLATFORM_MANAGE: 'platform.manage',
  CATALOG_MANAGE: 'catalog.manage',
  USERS_MANAGE: 'users.manage',
  NURSERIES_VERIFY: 'nurseries.verify',
  INVENTORY_MANAGE: 'inventory.manage',
  PRODUCTS_MANAGE: 'products.manage',
  ORDERS_FULFILL: 'orders.fulfill',
  CART_MANAGE: 'cart.manage',
  ORDERS_CREATE: 'orders.create',
  WISHLIST_MANAGE: 'wishlist.manage',
  RFQ_MANAGE: 'rfq.manage',
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export const ROLE_PERMISSION_BASELINE: Readonly<
  Record<UserRole, readonly Permission[]>
> = {
  [UserRole.ADMIN]: [
    PERMISSIONS.PLATFORM_MANAGE,
    PERMISSIONS.CATALOG_MANAGE,
    PERMISSIONS.USERS_MANAGE,
    PERMISSIONS.NURSERIES_VERIFY,
  ],
  [UserRole.NURSERY_OWNER]: [
    PERMISSIONS.INVENTORY_MANAGE,
    PERMISSIONS.PRODUCTS_MANAGE,
    PERMISSIONS.ORDERS_FULFILL,
  ],
  [UserRole.CUSTOMER]: [
    PERMISSIONS.CART_MANAGE,
    PERMISSIONS.ORDERS_CREATE,
    PERMISSIONS.WISHLIST_MANAGE,
  ],
  [UserRole.BUSINESS]: [
    PERMISSIONS.RFQ_MANAGE,
    PERMISSIONS.ORDERS_CREATE,
  ],
};
