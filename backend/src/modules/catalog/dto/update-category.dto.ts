import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';

/**
 * ============================================================================
 * UpdateCategoryDto
 * ============================================================================
 * Partial update of an existing Category.
 *
 * Notes:
 * - Slug is regenerated automatically if category_name changes.
 * - Hierarchy validation is handled inside CatalogService.
 * ============================================================================
 */

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
