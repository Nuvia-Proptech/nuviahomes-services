import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from "@nestjs/common"
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from "@nestjs/swagger"
import { PropertiesService } from "./properties.service"
import { CreatePropertyDto } from "./dto/create-property.dto"
import { FilterPropertyDto } from "./dto/filter-property.dto"
import { CreateReviewDto } from "./dto/create-review.dto"
import { PropertyResponseDto, PropertyListResponseDto, UpdatePropertyDto } from "./dto/property-response.dto"
import { ReviewResponseDto, PropertyReviewsResponseDto, AverageRatingResponseDto } from "./dto/review-response.dto"
import { JwtAuthGuard } from "@/modules/auth/guards/jwt-auth.guard"
import { RolesGuard } from "@/modules/auth/guards/roles.guard"
import { Roles } from "@/modules/auth/decorators/roles.decorator"
import { CurrentUser } from "@/modules/auth/decorators/current-user.decorator"
import { UserRole } from "@/common/enums/user-role.enum"
import { ErrorResponseDto, NotFoundResponseDto, UnauthorizedResponseDto } from "@/common/dto/error-response.dto"
import { MessageResponseDto } from "@/common/dto/success-response.dto"

@ApiTags("Properties")
@Controller("properties")
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.PROPERTY_OWNER, UserRole.AGENT, UserRole.SUPER_ADMIN)
  @ApiOperation({ 
    summary: "Create a new property listing",
    description: "Create a new property listing. Only property owners, agents, and super admins can create properties."
  })
  @ApiBody({ 
    type: CreatePropertyDto,
    examples: {
      residential: {
        summary: "Residential Property for Sale",
        description: "Example of a residential property listing for sale",
        value: {
          title: "Beautiful 3BR Family Home in Downtown",
          description: "Stunning 3-bedroom, 2-bathroom family home located in the heart of downtown. Features modern amenities, updated kitchen, and spacious living areas.",
          propertyType: "residential",
          listingType: "sale",
          price: 450000,
          pricePerUnit: 150,
          address: "123 Main Street",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          latitude: 40.7128,
          longitude: -74.0060,
          bedrooms: 3,
          bathrooms: 2,
          squareFeet: 1800,
          amenities: ["Air Conditioning", "Hardwood Floors", "Garage", "Garden"],
          tags: ["luxury", "downtown", "family-friendly"],
          videoUrl: "https://example.com/property-tour.mp4"
        }
      },
      rental: {
        summary: "Apartment for Rent",
        description: "Example of an apartment listing for rent",
        value: {
          title: "Modern 2BR Apartment Downtown",
          description: "Contemporary 2-bedroom apartment with city views and modern amenities.",
          propertyType: "residential",
          listingType: "rent",
          price: 2500,
          address: "456 Oak Avenue",
          city: "San Francisco",
          state: "CA",
          zipCode: "94102",
          bedrooms: 2,
          bathrooms: 1,
          squareFeet: 1200,
          amenities: ["Air Conditioning", "Balcony", "Gym Access"],
          tags: ["modern", "city-view"]
        }
      }
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: "Property created successfully",
    type: PropertyResponseDto
  })
  @ApiResponse({ 
    status: 401, 
    description: "Unauthorized - Invalid or missing JWT token",
    type: UnauthorizedResponseDto
  })
  @ApiResponse({ 
    status: 403, 
    description: "Forbidden - insufficient permissions",
    type: ErrorResponseDto
  })
  async create(@Body() createPropertyDto: CreatePropertyDto, @CurrentUser() user: any) {
    return this.propertiesService.create(createPropertyDto, user.id)
  }

  @Get()
  @ApiOperation({ 
    summary: "Get all properties with filters",
    description: "Retrieve a paginated list of properties with optional filtering by various criteria."
  })
  @ApiQuery({ 
    name: "search", 
    required: false, 
    description: "Search term for title, description, or address",
    example: "downtown family home"
  })
  @ApiQuery({ 
    name: "propertyType", 
    required: false, 
    enum: ["residential", "commercial", "land", "industrial", "mixed_use"],
    description: "Filter by property type"
  })
  @ApiQuery({ 
    name: "listingType", 
    required: false, 
    enum: ["sale", "rent"],
    description: "Filter by listing type"
  })
  @ApiQuery({ 
    name: "minPrice", 
    required: false, 
    type: Number,
    description: "Minimum price filter",
    example: 200000
  })
  @ApiQuery({ 
    name: "maxPrice", 
    required: false, 
    type: Number,
    description: "Maximum price filter",
    example: 800000
  })
  @ApiQuery({ 
    name: "city", 
    required: false, 
    description: "Filter by city",
    example: "New York"
  })
  @ApiQuery({ 
    name: "state", 
    required: false, 
    description: "Filter by state",
    example: "NY"
  })
  @ApiQuery({ 
    name: "page", 
    required: false, 
    type: Number,
    description: "Page number for pagination",
    example: 1
  })
  @ApiQuery({ 
    name: "limit", 
    required: false, 
    type: Number,
    description: "Number of items per page",
    example: 10
  })
  @ApiResponse({ 
    status: 200, 
    description: "Returns filtered properties with pagination",
    type: PropertyListResponseDto
  })
  async findAll(@Query() filterDto: FilterPropertyDto) {
    return this.propertiesService.findAll(filterDto)
  }

  @Get("featured")
  @ApiOperation({ 
    summary: "Get featured properties",
    description: "Retrieve a list of featured properties that are highlighted for promotion."
  })
  @ApiResponse({ 
    status: 200, 
    description: "Returns featured properties",
    type: [PropertyResponseDto]
  })
  async getFeatured() {
    return this.propertiesService.getFeaturedProperties()
  }

  @Get(':id')
  @ApiOperation({ 
    summary: "Get property by ID",
    description: "Retrieve detailed information about a specific property by its ID."
  })
  @ApiParam({ 
    name: "id", 
    description: "Property unique identifier",
    example: "507f1f77bcf86cd799439013"
  })
  @ApiResponse({ 
    status: 200, 
    description: "Returns property details",
    type: PropertyResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: "Property not found",
    type: NotFoundResponseDto
  })
  async findOne(@Param('id') id: string) {
    return this.propertiesService.findById(id);
  }

  @Patch(":id")
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ 
    summary: "Update property",
    description: "Update property information. Only the property owner, assigned agent, or admin can update a property."
  })
  @ApiParam({ 
    name: "id", 
    description: "Property unique identifier",
    example: "507f1f77bcf86cd799439013"
  })
  @ApiBody({ 
    type: UpdatePropertyDto,
    examples: {
      priceUpdate: {
        summary: "Update Property Price",
        description: "Update the property price and related information",
        value: {
          price: 475000,
          pricePerUnit: 160,
          description: "Updated description with new pricing information."
        }
      },
      featuredUpdate: {
        summary: "Make Property Featured",
        description: "Update property to be featured",
        value: {
          isFeatured: true,
          tags: ["luxury", "downtown", "family-friendly", "featured"]
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: "Property updated successfully",
    type: PropertyResponseDto
  })
  @ApiResponse({ 
    status: 401, 
    description: "Unauthorized - Invalid or missing JWT token",
    type: UnauthorizedResponseDto
  })
  @ApiResponse({ 
    status: 403, 
    description: "Forbidden - insufficient permissions to update this property",
    type: ErrorResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: "Property not found",
    type: NotFoundResponseDto
  })
  async update(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto, @CurrentUser() user: any) {
    return this.propertiesService.update(id, updatePropertyDto, user.id, user.role)
  }

  @Delete(":id")
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ 
    summary: "Delete property",
    description: "Delete a property listing. Only the property owner, assigned agent, or admin can delete a property."
  })
  @ApiParam({ 
    name: "id", 
    description: "Property unique identifier",
    example: "507f1f77bcf86cd799439013"
  })
  @ApiResponse({ 
    status: 200, 
    description: "Property deleted successfully",
    type: MessageResponseDto
  })
  @ApiResponse({ 
    status: 401, 
    description: "Unauthorized - Invalid or missing JWT token",
    type: UnauthorizedResponseDto
  })
  @ApiResponse({ 
    status: 403, 
    description: "Forbidden - insufficient permissions to delete this property",
    type: ErrorResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: "Property not found",
    type: NotFoundResponseDto
  })
  async remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.propertiesService.remove(id, user.id, user.role)
  }

  @Post(":id/approve")
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiOperation({ 
    summary: "Approve property (Admin only)",
    description: "Approve a pending property listing. Only super admins and admins can approve properties."
  })
  @ApiParam({ 
    name: "id", 
    description: "Property unique identifier",
    example: "507f1f77bcf86cd799439013"
  })
  @ApiResponse({ 
    status: 200, 
    description: "Property approved successfully",
    type: PropertyResponseDto
  })
  @ApiResponse({ 
    status: 401, 
    description: "Unauthorized - Invalid or missing JWT token",
    type: UnauthorizedResponseDto
  })
  @ApiResponse({ 
    status: 403, 
    description: "Forbidden - insufficient permissions",
    type: ErrorResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: "Property not found",
    type: NotFoundResponseDto
  })
  async approveProperty(@Param('id') id: string, @CurrentUser() user: any) {
    return this.propertiesService.approveProperty(id, user.id)
  }

  @Post(":id/reject")
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiOperation({ 
    summary: "Reject property (Admin only)",
    description: "Reject a pending property listing with a reason. Only super admins and admins can reject properties."
  })
  @ApiParam({ 
    name: "id", 
    description: "Property unique identifier",
    example: "507f1f77bcf86cd799439013"
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        reason: { 
          type: 'string', 
          example: 'Property does not meet our quality standards. Please provide better images and more detailed description.',
          description: 'Reason for rejection'
        }
      },
      required: ['reason']
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: "Property rejected successfully",
    type: PropertyResponseDto
  })
  @ApiResponse({ 
    status: 401, 
    description: "Unauthorized - Invalid or missing JWT token",
    type: UnauthorizedResponseDto
  })
  @ApiResponse({ 
    status: 403, 
    description: "Forbidden - insufficient permissions",
    type: ErrorResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: "Property not found",
    type: NotFoundResponseDto
  })
  async rejectProperty(@Param('id') id: string, @Body('reason') reason: string) {
    return this.propertiesService.rejectProperty(id, reason)
  }

  @Get('owner/:ownerId')
  @ApiOperation({ 
    summary: "Get properties by owner",
    description: "Retrieve all properties owned by a specific user."
  })
  @ApiParam({ 
    name: "ownerId", 
    description: "Owner's user ID",
    example: "507f1f77bcf86cd799439011"
  })
  @ApiResponse({ 
    status: 200, 
    description: "Returns owner's properties",
    type: [PropertyResponseDto]
  })
  @ApiResponse({ 
    status: 404, 
    description: "Owner not found or has no properties",
    type: NotFoundResponseDto
  })
  async getPropertiesByOwner(@Param('ownerId') ownerId: string) {
    return this.propertiesService.getPropertiesByOwner(ownerId);
  }

  // Reviews
  @Post(":propertyId/reviews")
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ 
    summary: "Create a property review",
    description: "Create a review for a property. Users must be authenticated to leave reviews."
  })
  @ApiParam({ 
    name: "propertyId", 
    description: "Property unique identifier",
    example: "507f1f77bcf86cd799439013"
  })
  @ApiBody({ 
    type: CreateReviewDto,
    examples: {
      positiveReview: {
        summary: "Positive Review",
        description: "Example of a positive property review",
        value: {
          rating: 5,
          comment: "Absolutely loved this property! The location is perfect and the amenities are top-notch. The agent was very helpful throughout the process. Highly recommend!",
          images: [
            "https://example.com/review1-photo1.jpg",
            "https://example.com/review1-photo2.jpg"
          ]
        }
      },
      neutralReview: {
        summary: "Neutral Review",
        description: "Example of a neutral property review",
        value: {
          rating: 3,
          comment: "The property is decent but has some issues. The location is good but the condition could be better. Fair value for the price."
        }
      }
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: "Review created successfully",
    type: ReviewResponseDto
  })
  @ApiResponse({ 
    status: 401, 
    description: "Unauthorized - Invalid or missing JWT token",
    type: UnauthorizedResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: "Property not found",
    type: NotFoundResponseDto
  })
  async createReview(
    @Param('propertyId') propertyId: string,
    @Body() createReviewDto: CreateReviewDto,
    @CurrentUser() user: any,
  ) {
    return this.propertiesService.createReview(propertyId, user.id, createReviewDto)
  }

  @Get(':propertyId/reviews')
  @ApiOperation({ 
    summary: "Get all reviews for a property",
    description: "Retrieve all reviews for a specific property with user information and average rating."
  })
  @ApiParam({ 
    name: "propertyId", 
    description: "Property unique identifier",
    example: "507f1f77bcf86cd799439013"
  })
  @ApiResponse({ 
    status: 200, 
    description: "Returns property reviews with average rating",
    type: PropertyReviewsResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: "Property not found",
    type: NotFoundResponseDto
  })
  async getPropertyReviews(@Param('propertyId') propertyId: string) {
    return this.propertiesService.getPropertyReviews(propertyId);
  }

  @Get(':propertyId/reviews/rating')
  @ApiOperation({ 
    summary: "Get average rating for a property",
    description: "Get the average rating and rating distribution for a specific property."
  })
  @ApiParam({ 
    name: "propertyId", 
    description: "Property unique identifier",
    example: "507f1f77bcf86cd799439013"
  })
  @ApiResponse({ 
    status: 200, 
    description: "Returns average rating and distribution",
    type: AverageRatingResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: "Property not found",
    type: NotFoundResponseDto
  })
  async getAverageRating(@Param('propertyId') propertyId: string) {
    return this.propertiesService.getAverageRating(propertyId);
  }
}
