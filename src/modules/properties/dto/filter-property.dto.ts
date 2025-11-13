import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsNumber, IsEnum, IsString, Min } from "class-validator"
import { PropertyType } from "@/common/enums/property-type.enum"
import { ListingType } from "@/common/enums/listing-type.enum"
import { PropertyStatus } from "@/common/enums/property-status.enum"

export class FilterPropertyDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(PropertyType)
  propertyType?: PropertyType

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(ListingType)
  listingType?: ListingType

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minPrice?: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  maxPrice?: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  city?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  state?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minBedrooms?: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxBedrooms?: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minBathrooms?: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(PropertyStatus)
  status?: PropertyStatus

  @ApiProperty({ required: false })
  @IsOptional()
  isFeatured?: boolean

  @ApiProperty({ required: false, default: 1 })
  @IsOptional()
  @IsNumber()
  page?: number

  @ApiProperty({ required: false, default: 10 })
  @IsOptional()
  @IsNumber()
  limit?: number
}
