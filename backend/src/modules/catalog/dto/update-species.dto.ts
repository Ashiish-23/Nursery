import { PartialType } from '@nestjs/mapped-types';
import { CreateSpeciesDto } from './create-species.dto';

/**
 * ============================================================================
 * UpdateSpeciesDto
 * ============================================================================
 * DTO used to update an existing Species in the Platform Catalog.
 *
 * Notes:
 * - All fields are optional.
 * - Scientific name uniqueness is validated by CatalogService.
 * - Category validation is handled by CatalogService.
 * - Primary category must belong to the supplied category list.
 * - Audit fields (created_by, updated_by, timestamps) are managed
 *   by the backend and are never accepted from the client.
 * ============================================================================
 */

export class UpdateSpeciesDto extends PartialType(CreateSpeciesDto) {}
