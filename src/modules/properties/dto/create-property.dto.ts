import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNumber, IsEnum, IsOptional, IsArray, Min, IsLatitude, IsLongitude } from "class-validator"
import { PropertyType } from "@/common/enums/property-type.enum"
import { ListingType } from "@/common/enums/listing-type.enum"

export class CreatePropertyDto {
  @ApiProperty()
  @IsString()
  title: string

  @ApiProperty()
  @IsString()
  description: string

  @ApiProperty({ enum: PropertyType })
  @IsEnum(PropertyType)
  propertyType: PropertyType

  @ApiProperty({ enum: ListingType })
  @IsEnum(ListingType)
  listingType: ListingType

  @ApiProperty()
  @IsNumber()
  @Min(0)
  price: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  pricePerUnit?: number

  @ApiProperty()
  @IsString()
  address: string

  @ApiProperty()
  @IsString()
  city: string

  @ApiProperty()
  @IsString()
  state: string

  @ApiProperty()
  @IsString()
  zipCode: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsLatitude()
  latitude?: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsLongitude()
  longitude?: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  bedrooms?: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  bathrooms?: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  squareFeet?: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  amenities?: string[]

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  tags?: string[]

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  videoUrl?: string
}
