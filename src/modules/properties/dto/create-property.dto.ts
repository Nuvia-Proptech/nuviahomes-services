import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNumber, IsEnum, IsOptional, IsArray, Min, IsLatitude, IsLongitude } from "class-validator"
import { PropertyType } from "@/common/enums/property-type.enum"
import { ListingType } from "@/common/enums/listing-type.enum"

export class CreatePropertyDto {
  @ApiProperty({ 
    example: "Beautiful 3BR Family Home in Downtown",
    description: "Property title"
  })
  @IsString()
  title: string

  @ApiProperty({ 
    example: "Stunning 3-bedroom, 2-bathroom family home located in the heart of downtown. Features modern amenities, updated kitchen, and spacious living areas. Perfect for families looking for convenience and comfort.",
    description: "Detailed property description"
  })
  @IsString()
  description: string

  @ApiProperty({ 
    example: PropertyType.RESIDENTIAL,
    enum: PropertyType,
    description: "Type of property"
  })
  @IsEnum(PropertyType)
  propertyType: PropertyType

  @ApiProperty({ 
    example: ListingType.SALE,
    enum: ListingType,
    description: "Listing type (sale or rent)"
  })
  @IsEnum(ListingType)
  listingType: ListingType

  @ApiProperty({ 
    example: 450000,
    description: "Property price in USD"
  })
  @IsNumber()
  @Min(0)
  price: number

  @ApiProperty({ 
    example: 150,
    description: "Price per square foot",
    required: false
  })
  @IsOptional()
  @IsNumber()
  pricePerUnit?: number

  @ApiProperty({ 
    example: "123 Main Street",
    description: "Property street address"
  })
  @IsString()
  address: string

  @ApiProperty({ 
    example: "New York",
    description: "City where property is located"
  })
  @IsString()
  city: string

  @ApiProperty({ 
    example: "NY",
    description: "State where property is located"
  })
  @IsString()
  state: string

  @ApiProperty({ 
    example: "10001",
    description: "ZIP/Postal code"
  })
  @IsString()
  zipCode: string

  @ApiProperty({ 
    example: 40.7128,
    description: "Latitude coordinate",
    required: false
  })
  @IsOptional()
  @IsLatitude()
  latitude?: number

  @ApiProperty({ 
    example: -74.0060,
    description: "Longitude coordinate",
    required: false
  })
  @IsOptional()
  @IsLongitude()
  longitude?: number

  @ApiProperty({ 
    example: 3,
    description: "Number of bedrooms",
    required: false
  })
  @IsOptional()
  @IsNumber()
  bedrooms?: number

  @ApiProperty({ 
    example: 2,
    description: "Number of bathrooms",
    required: false
  })
  @IsOptional()
  @IsNumber()
  bathrooms?: number

  @ApiProperty({ 
    example: 1800,
    description: "Total square footage",
    required: false
  })
  @IsOptional()
  @IsNumber()
  squareFeet?: number

  @ApiProperty({ 
    example: ["Air Conditioning", "Hardwood Floors", "Garage", "Garden", "Swimming Pool"],
    description: "List of property amenities",
    required: false
  })
  @IsOptional()
  @IsArray()
  amenities?: string[]

  @ApiProperty({ 
    example: ["luxury", "downtown", "family-friendly", "modern"],
    description: "Property tags for categorization",
    required: false
  })
  @IsOptional()
  @IsArray()
  tags?: string[]

  @ApiProperty({ 
    example: "https://example.com/property1-tour.mp4",
    description: "Property video tour URL",
    required: false
  })
  @IsOptional()
  @IsString()
  videoUrl?: string
}
