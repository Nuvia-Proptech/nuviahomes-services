import { ApiProperty } from "@nestjs/swagger"
import { PropertyType } from "@/common/enums/property-type.enum"
import { ListingType } from "@/common/enums/listing-type.enum"
import { PropertyStatus } from "@/common/enums/property-status.enum"

export class LocationDto {
  @ApiProperty({ 
    example: 40.7128,
    description: "Latitude coordinate"
  })
  latitude: number

  @ApiProperty({ 
    example: -74.0060,
    description: "Longitude coordinate"
  })
  longitude: number
}

export class PropertyOwnerDto {
  @ApiProperty({ 
    example: "507f1f77bcf86cd799439011",
    description: "Owner's unique identifier"
  })
  _id: string

  @ApiProperty({ 
    example: "John",
    description: "Owner's first name"
  })
  firstName: string

  @ApiProperty({ 
    example: "Doe",
    description: "Owner's last name"
  })
  lastName: string

  @ApiProperty({ 
    example: "john.doe@example.com",
    description: "Owner's email address"
  })
  email: string

  @ApiProperty({ 
    example: "+1234567890",
    description: "Owner's phone number",
    required: false
  })
  phone?: string
}

export class PropertyAgentDto {
  @ApiProperty({ 
    example: "507f1f77bcf86cd799439012",
    description: "Agent's unique identifier"
  })
  _id: string

  @ApiProperty({ 
    example: "Jane",
    description: "Agent's first name"
  })
  firstName: string

  @ApiProperty({ 
    example: "Smith",
    description: "Agent's last name"
  })
  lastName: string

  @ApiProperty({ 
    example: "jane.smith@nuviahomes.com",
    description: "Agent's email address"
  })
  email: string

  @ApiProperty({ 
    example: "+1987654321",
    description: "Agent's phone number",
    required: false
  })
  phone?: string

  @ApiProperty({ 
    example: "Nuvia Homes",
    description: "Agent's company",
    required: false
  })
  company?: string
}

export class PropertyResponseDto {
  @ApiProperty({ 
    example: "507f1f77bcf86cd799439013",
    description: "Property's unique identifier"
  })
  _id: string

  @ApiProperty({ 
    example: "Beautiful 3BR Family Home in Downtown",
    description: "Property title"
  })
  title: string

  @ApiProperty({ 
    example: "Stunning 3-bedroom, 2-bathroom family home located in the heart of downtown. Features modern amenities, updated kitchen, and spacious living areas. Perfect for families looking for convenience and comfort.",
    description: "Detailed property description"
  })
  description: string

  @ApiProperty({ 
    example: PropertyType.RESIDENTIAL,
    enum: PropertyType,
    description: "Type of property"
  })
  propertyType: PropertyType

  @ApiProperty({ 
    example: ListingType.SALE,
    enum: ListingType,
    description: "Listing type (sale or rent)"
  })
  listingType: ListingType

  @ApiProperty({ 
    example: 450000,
    description: "Property price in USD"
  })
  price: number

  @ApiProperty({ 
    example: 150,
    description: "Price per square foot",
    required: false
  })
  pricePerUnit?: number

  @ApiProperty({ 
    example: "123 Main Street",
    description: "Property street address"
  })
  address: string

  @ApiProperty({ 
    example: "New York",
    description: "City where property is located"
  })
  city: string

  @ApiProperty({ 
    example: "NY",
    description: "State where property is located"
  })
  state: string

  @ApiProperty({ 
    example: "10001",
    description: "ZIP/Postal code"
  })
  zipCode: string

  @ApiProperty({ 
    type: LocationDto,
    description: "Geographic coordinates",
    required: false
  })
  location?: LocationDto

  @ApiProperty({ 
    example: 3,
    description: "Number of bedrooms",
    required: false
  })
  bedrooms?: number

  @ApiProperty({ 
    example: 2,
    description: "Number of bathrooms",
    required: false
  })
  bathrooms?: number

  @ApiProperty({ 
    example: 1800,
    description: "Total square footage",
    required: false
  })
  squareFeet?: number

  @ApiProperty({ 
    example: ["Air Conditioning", "Hardwood Floors", "Garage", "Garden", "Swimming Pool"],
    description: "List of property amenities",
    required: false
  })
  amenities?: string[]

  @ApiProperty({ 
    example: [
      "https://example.com/property1-main.jpg",
      "https://example.com/property1-kitchen.jpg",
      "https://example.com/property1-bedroom.jpg"
    ],
    description: "Array of property image URLs",
    required: false
  })
  images?: string[]

  @ApiProperty({ 
    example: "https://example.com/property1-tour.mp4",
    description: "Property video tour URL",
    required: false
  })
  videoUrl?: string

  @ApiProperty({ 
    example: [
      "https://example.com/property1-floorplan1.jpg",
      "https://example.com/property1-floorplan2.jpg"
    ],
    description: "Array of floor plan image URLs",
    required: false
  })
  floorPlanImages?: string[]

  @ApiProperty({ 
    type: PropertyOwnerDto,
    description: "Property owner information"
  })
  owner: PropertyOwnerDto

  @ApiProperty({ 
    type: PropertyAgentDto,
    description: "Assigned real estate agent",
    required: false
  })
  agent?: PropertyAgentDto

  @ApiProperty({ 
    example: PropertyStatus.APPROVED,
    enum: PropertyStatus,
    description: "Current property status"
  })
  status: PropertyStatus

  @ApiProperty({ 
    example: "507f1f77bcf86cd799439014",
    description: "ID of admin who approved the property",
    required: false
  })
  approvedBy?: string

  @ApiProperty({ 
    example: "Property does not meet our quality standards",
    description: "Reason for rejection if status is rejected",
    required: false
  })
  rejectionReason?: string

  @ApiProperty({ 
    example: true,
    description: "Whether property is featured"
  })
  isFeatured: boolean

  @ApiProperty({ 
    example: 245,
    description: "Number of times property has been viewed"
  })
  views: number

  @ApiProperty({ 
    example: ["luxury", "downtown", "family-friendly", "modern"],
    description: "Property tags for categorization",
    required: false
  })
  tags?: string[]

  @ApiProperty({ 
    example: true,
    description: "Whether property listing is active"
  })
  isActive: boolean

  @ApiProperty({ 
    example: "2024-01-15T10:30:00.000Z",
    description: "Property creation timestamp"
  })
  createdAt: string

  @ApiProperty({ 
    example: "2024-01-20T14:45:00.000Z",
    description: "Last update timestamp"
  })
  updatedAt: string
}

export class PropertyListResponseDto {
  @ApiProperty({ 
    type: [PropertyResponseDto],
    description: "Array of properties"
  })
  properties: PropertyResponseDto[]

  @ApiProperty({ 
    example: 1,
    description: "Current page number"
  })
  page: number

  @ApiProperty({ 
    example: 10,
    description: "Number of items per page"
  })
  limit: number

  @ApiProperty({ 
    example: 156,
    description: "Total number of properties"
  })
  total: number

  @ApiProperty({ 
    example: 16,
    description: "Total number of pages"
  })
  totalPages: number
}

export class UpdatePropertyDto {
  @ApiProperty({ 
    example: "Updated Beautiful 3BR Family Home in Downtown",
    description: "Property title",
    required: false
  })
  title?: string

  @ApiProperty({ 
    example: "Updated description with new features and amenities.",
    description: "Property description",
    required: false
  })
  description?: string

  @ApiProperty({ 
    example: 475000,
    description: "Updated property price",
    required: false
  })
  price?: number

  @ApiProperty({ 
    example: 160,
    description: "Updated price per square foot",
    required: false
  })
  pricePerUnit?: number

  @ApiProperty({ 
    example: ["Air Conditioning", "Hardwood Floors", "Garage", "Garden", "Swimming Pool", "Updated Kitchen"],
    description: "Updated list of amenities",
    required: false
  })
  amenities?: string[]

  @ApiProperty({ 
    example: ["luxury", "downtown", "family-friendly", "modern", "updated"],
    description: "Updated property tags",
    required: false
  })
  tags?: string[]

  @ApiProperty({ 
    example: "https://example.com/property1-new-tour.mp4",
    description: "Updated video tour URL",
    required: false
  })
  videoUrl?: string

  @ApiProperty({ 
    example: true,
    description: "Whether property should be featured",
    required: false
  })
  isFeatured?: boolean
}