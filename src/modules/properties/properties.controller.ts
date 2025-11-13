import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common"
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger"
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
  async create(createPropertyDto: CreatePropertyDto, @CurrentUser() user: any) {
    return this.propertiesService.create(createPropertyDto, user.id)
  }

  @Get()
  async findAll(filterDto: FilterPropertyDto) {
    return this.propertiesService.findAll(filterDto)
  }

  @Get("featured")
  async getFeatured() {
    return this.propertiesService.getFeaturedProperties()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.propertiesService.findById(id);
  }

  @Patch(":id")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, updatePropertyDto: any, @CurrentUser() user: any) {
    return this.propertiesService.update(id, updatePropertyDto, user.id, user.role)
  }

  @Delete(":id")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.propertiesService.remove(id, user.id, user.role)
  }

  @Post(":id/approve")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  async approveProperty(@Param('id') id: string, @CurrentUser() user: any) {
    return this.propertiesService.approveProperty(id, user.id)
  }

  @Post(":id/reject")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  async rejectProperty(@Param('id') id: string, @Body('reason') reason: string) {
    return this.propertiesService.rejectProperty(id, reason)
  }

  @Get('owner/:ownerId')
  async getPropertiesByOwner(@Param('ownerId') ownerId: string) {
    return this.propertiesService.getPropertiesByOwner(ownerId);
  }

  // Reviews
  @Post(":propertyId/reviews")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async createReview(
    @Param('propertyId') propertyId: string,
    createReviewDto: CreateReviewDto,
    @CurrentUser() user: any,
  ) {
    return this.propertiesService.createReview(propertyId, user.id, createReviewDto)
  }

  @Get(':propertyId/reviews')
  async getPropertyReviews(@Param('propertyId') propertyId: string) {
    return this.propertiesService.getPropertyReviews(propertyId);
  }

  @Get(':propertyId/reviews/rating')
  async getAverageRating(@Param('propertyId') propertyId: string) {
    return this.propertiesService.getAverageRating(propertyId);
  }
}
