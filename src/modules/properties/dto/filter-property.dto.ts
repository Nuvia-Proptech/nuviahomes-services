import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsNumber, IsEnum, IsString, Min } from "class-validator"
import { PropertyType } from "@/common/enums/property-type.enum"
import { ListingType } from "@/common/enums/listing-type.enum"
import { PropertyStatus } from "@/common/enums/property-status.enum"

export class FilterPropertyDto {
  @ApiProperty({ 
    example: "downtown family home",
    description: "Search term for title, description, or address",
    required: false
  })
  @IsOptional()
  @IsString()
  search?: string

  @ApiProperty({ 
    example: PropertyType.RESIDENTIAL,
    enum: PropertyType,
    description: "Filter by property type",
    required: false
  })
  @IsOptional()
  @IsEnum(PropertyType)
  propertyType?: PropertyType

  @ApiProperty({ 
    example: ListingType.SALE,
    enum: ListingType,
    description: "Filter by listing type (sale or rent)",
    required: false
  })
  @IsOptional()
  @IsEnum(ListingType)
  listingType?: ListingType

  @ApiProperty({ 
    example: 200000,
    description: "Minimum price filter",
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minPrice?: number

  @ApiProperty({ 
    example: 800000,
    description: "Maximum price filter",
    required: false
  })
  @IsOptional()
  @IsNumber()
  maxPrice?: number

  @ApiProperty({ 
    example: "New York",
    description: "Filter by city",
    required: false
  })
  @IsOptional()
  @IsString()
  city?: string

  @ApiProperty({ 
    example: "NY",
    description: "Filter by state",
    required: false
  })
  @IsOptional()
  @IsString()
  state?: string

  @ApiProperty({ 
    example: 2,
    description: "Minimum number of bedrooms",
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minBedrooms?: number

  @ApiProperty({ 
    example: 5,
    description: "Maximum number of bedrooms",
    required: false
  })
  @IsOptional()
  @IsNumber()
  maxBedrooms?: number

  @ApiProperty({ 
    example: 1,
    description: "Minimum number of bathrooms",
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minBathrooms?: number

  @ApiProperty({ 
    example: PropertyStatus.APPROVED,
    enum: PropertyStatus,
    description: "Filter by property status",
    required: false
  })
  @IsOptional()
  @IsEnum(PropertyStatus)
  status?: PropertyStatus

  @ApiProperty({ 
    example: true,
    description: "Filter for featured properties only",
    required: false
  })
  @IsOptional()
  isFeatured?: boolean

  @ApiProperty({ 
    example: 1,
    description: "Page number for pagination",
    default: 1,
    required: false
  })
  @IsOptional()
  @IsNumber()
  page?: number

  @ApiProperty({ 
    example: 10,
    description: "Number of items per page",
    default: 10,
    required: false
  })
  @IsOptional()
  @IsNumber()
  limit?: number
}