import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ArrayUnique,
  MaxLength,
} from 'class-validator';

import {
  growth_rate as GrowthRate,
  plant_type as PlantType,
  species_status as SpeciesStatus,
  sunlight_requirement as SunlightRequirement,
  water_requirement as WaterRequirement,
} from '@prisma/client';

/**
 * ============================================================================
 * CreateSpeciesDto
 * ============================================================================
 * DTO used by administrators to create a new Species in the
 * Platform Catalog.
 *
 * NOTE:
 * Species represent botanical knowledge.
 * They DO NOT contain any commerce-related information.
 * ============================================================================
 */
export class CreateSpeciesDto {
  /**
   * Scientific name (Globally Unique)
   * Example: Rosa indica
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  scientific_name!: string;

  /**
   * Botanical genus
   * Example: Rosa
   */
  @IsOptional()
  @IsString()
  @MaxLength(150)
  genus?: string;

  /**
   * Botanical family
   * Example: Rosaceae
   */
  @IsOptional()
  @IsString()
  @MaxLength(150)
  family?: string;

  /**
   * English display name
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name_english!: string;

  /**
   * Kannada display name
   */
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name_kannada?: string;

  /**
   * Alternative/Common names
   */
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  common_names?: string[];

  /**
   * Plant Type
   */
  @IsEnum(PlantType)
  plant_type!: PlantType;

  /**
   * Sunlight Requirement
   */
  @IsEnum(SunlightRequirement)
  sunlight_requirement!: SunlightRequirement;

  /**
   * Water Requirement
   */
  @IsEnum(WaterRequirement)
  water_requirement!: WaterRequirement;

  /**
   * Growth Rate
   */
  @IsEnum(GrowthRate)
  growth_rate!: GrowthRate;

  /**
   * Botanical Description
   */
  @IsOptional()
  @IsString()
  description?: string;

  /**
   * Initial Species Status
   *
   * Defaults to DRAFT if omitted.
   */
  @IsOptional()
  @IsEnum(SpeciesStatus)
  status?: SpeciesStatus;

  /**
   * Categories assigned to this Species.
   *
   * At least one category should be supplied by the UI.
   * The CatalogService will validate business rules.
   */
  @IsArray()
  @ArrayUnique()
  @IsUUID('4', { each: true })
  category_ids!: string[];

  /**
   * Primary Category
   *
   * Must exist within category_ids.
   * Validation is performed inside CatalogService.
   */
  @IsUUID()
  primary_category_id!: string;
}
