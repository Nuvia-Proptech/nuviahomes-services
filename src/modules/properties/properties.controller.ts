import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from "@nestjs/common"
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam, ApiBody } from "@nestjs/swagger"
import { PropertiesService } from "./properties.service"
import type { CreatePropertyDto } from "./dto/create-property.dto"
import type { FilterPropertyDto } from "./dto/filter-property.dto"
import type { CreateReviewDto } from "./dto/create-review.dto"
import { JwtAuthGuard } from "@/modules/auth/guards/jwt-auth.guard"
import { RolesGuard } from "@/modules/auth/guards/roles.guard"
import { Roles } from "@/modules/auth/decorators/roles.decorator"
import { CurrentUser } from "@/modules/auth/decorators/current-user.decorator"
import { UserRole } from "@/common/enums/user-role.enum"

@ApiTags("Properties")
@Controller("properties")
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.PROPERTY_OWNER, UserRole.AGENT, UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: "Create a new property listing" })
  @ApiResponse({ status: 201, description: "Property created successfully" })
  @ApiResponse({ status: 403, description: "Forbidden - insufficient permissions" })
  async create(@Body() createPropertyDto: CreatePropertyDto, @CurrentUser() user: any) {
    return this.propertiesService.create(createPropertyDto, user.id)
  }

  @Get()
  @ApiOperation({ summary: "Get all properties with filters" })
  @ApiResponse({ status: 200, description: "Returns filtered properties" })
  async findAll(@Query() filterDto: FilterPropertyDto) {
    return this.propertiesService.findAll(filterDto)
  }

  @Get("featured")
  @ApiOperation({ summary: "Get featured properties" })
  @ApiResponse({ status: 200, description: "Returns featured properties" })
  async getFeatured() {
    return this.propertiesService.getFeaturedProperties()
  }

  @Get(':id')
  @ApiOperation({ summary: "Get property by ID" })
  @ApiParam({ name: "id", description: "Property ID" })
  @ApiResponse({ status: 200, description: "Returns property details" })
  @ApiResponse({ status: 404, description: "Property not found" })
  async findOne(@Param('id') id: string) {
    return this.propertiesService.findById(id);
  }

  @Patch(":id")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Update property" })
  @ApiParam({ name: "id", description: "Property ID" })
  @ApiResponse({ status: 200, description: "Property updated successfully" })
  async update(@Param('id') id: string, @Body() updatePropertyDto: any, @CurrentUser() user: any) {
    return this.propertiesService.update(id, updatePropertyDto, user.id, user.role)
  }

  @Delete(":id")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Delete property" })
  @ApiParam({ name: "id", description: "Property ID" })
  @ApiResponse({ status: 200, description: "Property deleted successfully" })
  async remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.propertiesService.remove(id, user.id, user.role)
  }

  @Post(":id/approve")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiOperation({ summary: "Approve property (Admin only)" })
  @ApiParam({ name: "id", description: "Property ID" })
  @ApiResponse({ status: 200, description: "Property approved successfully" })
  async approveProperty(@Param('id') id: string, @CurrentUser() user: any) {
    return this.propertiesService.approveProperty(id, user.id)
  }

  @Post(":id/reject")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiOperation({ summary: "Reject property (Admin only)" })
  @ApiParam({ name: "id", description: "Property ID" })
  @ApiResponse({ status: 200, description: "Property rejected successfully" })
  async rejectProperty(@Param('id') id: string, @Body('reason') reason: string) {
    return this.propertiesService.rejectProperty(id, reason)
  }

  @Get('owner/:ownerId')
  @ApiOperation({ summary: "Get properties by owner" })
  @ApiParam({ name: "ownerId", description: "Owner ID" })
  @ApiResponse({ status: 200, description: "Returns owner's properties" })
  async getPropertiesByOwner(@Param('ownerId') ownerId: string) {
    return this.propertiesService.getPropertiesByOwner(ownerId);
  }

  // Reviews
  @Post(":propertyId/reviews")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Create a property review" })
  @ApiParam({ name: "propertyId", description: "Property ID" })
  @ApiResponse({ status: 201, description: "Review created successfully" })
  async createReview(
    @Param('propertyId') propertyId: string,
    @Body() createReviewDto: CreateReviewDto,
    @CurrentUser() user: any,
  ) {
    return this.propertiesService.createReview(propertyId, user.id, createReviewDto)
  }

  @Get(':propertyId/reviews')
  @ApiOperation({ summary: "Get all reviews for a property" })
  @ApiParam({ name: "propertyId", description: "Property ID" })
  @ApiResponse({ status: 200, description: "Returns property reviews" })
  async getPropertyReviews(@Param('propertyId') propertyId: string) {
    return this.propertiesService.getPropertyReviews(propertyId);
  }

  @Get(':propertyId/reviews/rating')
  @ApiOperation({ summary: "Get average rating for a property" })
  @ApiParam({ name: "propertyId", description: "Property ID" })
  @ApiResponse({ status: 200, description: "Returns average rating" })
  async getAverageRating(@Param('propertyId') propertyId: string) {
    return this.propertiesService.getAverageRating(propertyId);
  }
}
