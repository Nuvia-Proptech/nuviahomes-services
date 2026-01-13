"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertiesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const properties_service_1 = require("./properties.service");
const create_property_dto_1 = require("./dto/create-property.dto");
const filter_property_dto_1 = require("./dto/filter-property.dto");
const create_review_dto_1 = require("./dto/create-review.dto");
const property_response_dto_1 = require("./dto/property-response.dto");
const review_response_dto_1 = require("./dto/review-response.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const user_role_enum_1 = require("../../common/enums/user-role.enum");
const error_response_dto_1 = require("../../common/dto/error-response.dto");
const success_response_dto_1 = require("../../common/dto/success-response.dto");
let PropertiesController = class PropertiesController {
    propertiesService;
    constructor(propertiesService) {
        this.propertiesService = propertiesService;
    }
    async create(createPropertyDto, user) {
        return this.propertiesService.create(createPropertyDto, user.id);
    }
    async findAll(filterDto) {
        return this.propertiesService.findAll(filterDto);
    }
    async getFeatured() {
        return this.propertiesService.getFeaturedProperties();
    }
    async findOne(id) {
        return this.propertiesService.findById(id);
    }
    async update(id, updatePropertyDto, user) {
        return this.propertiesService.update(id, updatePropertyDto, user.id, user.role);
    }
    async remove(id, user) {
        return this.propertiesService.remove(id, user.id, user.role);
    }
    async approveProperty(id, user) {
        return this.propertiesService.approveProperty(id, user.id);
    }
    async rejectProperty(id, reason) {
        return this.propertiesService.rejectProperty(id, reason);
    }
    async getPropertiesByOwner(ownerId) {
        return this.propertiesService.getPropertiesByOwner(ownerId);
    }
    async createReview(propertyId, createReviewDto, user) {
        return this.propertiesService.createReview(propertyId, user.id, createReviewDto);
    }
    async getPropertyReviews(propertyId) {
        return this.propertiesService.getPropertyReviews(propertyId);
    }
    async getAverageRating(propertyId) {
        return this.propertiesService.getAverageRating(propertyId);
    }
};
exports.PropertiesController = PropertiesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.PROPERTY_OWNER, user_role_enum_1.UserRole.AGENT, user_role_enum_1.UserRole.SUPER_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: "Create a new property listing",
        description: "Create a new property listing. Only property owners, agents, and super admins can create properties."
    }),
    (0, swagger_1.ApiBody)({
        type: create_property_dto_1.CreatePropertyDto,
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
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Property created successfully",
        type: property_response_dto_1.PropertyResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing JWT token",
        type: error_response_dto_1.UnauthorizedResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: "Forbidden - insufficient permissions",
        type: error_response_dto_1.ErrorResponseDto
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_property_dto_1.CreatePropertyDto, Object]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: "Get all properties with filters",
        description: "Retrieve a paginated list of properties with optional filtering by various criteria."
    }),
    (0, swagger_1.ApiQuery)({
        name: "search",
        required: false,
        description: "Search term for title, description, or address",
        example: "downtown family home"
    }),
    (0, swagger_1.ApiQuery)({
        name: "propertyType",
        required: false,
        enum: ["residential", "commercial", "land", "industrial", "mixed_use"],
        description: "Filter by property type"
    }),
    (0, swagger_1.ApiQuery)({
        name: "listingType",
        required: false,
        enum: ["sale", "rent"],
        description: "Filter by listing type"
    }),
    (0, swagger_1.ApiQuery)({
        name: "minPrice",
        required: false,
        type: Number,
        description: "Minimum price filter",
        example: 200000
    }),
    (0, swagger_1.ApiQuery)({
        name: "maxPrice",
        required: false,
        type: Number,
        description: "Maximum price filter",
        example: 800000
    }),
    (0, swagger_1.ApiQuery)({
        name: "city",
        required: false,
        description: "Filter by city",
        example: "New York"
    }),
    (0, swagger_1.ApiQuery)({
        name: "state",
        required: false,
        description: "Filter by state",
        example: "NY"
    }),
    (0, swagger_1.ApiQuery)({
        name: "page",
        required: false,
        type: Number,
        description: "Page number for pagination",
        example: 1
    }),
    (0, swagger_1.ApiQuery)({
        name: "limit",
        required: false,
        type: Number,
        description: "Number of items per page",
        example: 10
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Returns filtered properties with pagination",
        type: property_response_dto_1.PropertyListResponseDto
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_property_dto_1.FilterPropertyDto]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("featured"),
    (0, swagger_1.ApiOperation)({
        summary: "Get featured properties",
        description: "Retrieve a list of featured properties that are highlighted for promotion."
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Returns featured properties",
        type: [property_response_dto_1.PropertyResponseDto]
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "getFeatured", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: "Get property by ID",
        description: "Retrieve detailed information about a specific property by its ID."
    }),
    (0, swagger_1.ApiParam)({
        name: "id",
        description: "Property unique identifier",
        example: "507f1f77bcf86cd799439013"
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Returns property details",
        type: property_response_dto_1.PropertyResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Property not found",
        type: error_response_dto_1.NotFoundResponseDto
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: "Update property",
        description: "Update property information. Only the property owner, assigned agent, or admin can update a property."
    }),
    (0, swagger_1.ApiParam)({
        name: "id",
        description: "Property unique identifier",
        example: "507f1f77bcf86cd799439013"
    }),
    (0, swagger_1.ApiBody)({
        type: property_response_dto_1.UpdatePropertyDto,
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
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Property updated successfully",
        type: property_response_dto_1.PropertyResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing JWT token",
        type: error_response_dto_1.UnauthorizedResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: "Forbidden - insufficient permissions to update this property",
        type: error_response_dto_1.ErrorResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Property not found",
        type: error_response_dto_1.NotFoundResponseDto
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, property_response_dto_1.UpdatePropertyDto, Object]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: "Delete property",
        description: "Delete a property listing. Only the property owner, assigned agent, or admin can delete a property."
    }),
    (0, swagger_1.ApiParam)({
        name: "id",
        description: "Property unique identifier",
        example: "507f1f77bcf86cd799439013"
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Property deleted successfully",
        type: success_response_dto_1.MessageResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing JWT token",
        type: error_response_dto_1.UnauthorizedResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: "Forbidden - insufficient permissions to delete this property",
        type: error_response_dto_1.ErrorResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Property not found",
        type: error_response_dto_1.NotFoundResponseDto
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(":id/approve"),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPER_ADMIN, user_role_enum_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: "Approve property (Admin only)",
        description: "Approve a pending property listing. Only super admins and admins can approve properties."
    }),
    (0, swagger_1.ApiParam)({
        name: "id",
        description: "Property unique identifier",
        example: "507f1f77bcf86cd799439013"
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Property approved successfully",
        type: property_response_dto_1.PropertyResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing JWT token",
        type: error_response_dto_1.UnauthorizedResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: "Forbidden - insufficient permissions",
        type: error_response_dto_1.ErrorResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Property not found",
        type: error_response_dto_1.NotFoundResponseDto
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "approveProperty", null);
__decorate([
    (0, common_1.Post)(":id/reject"),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPER_ADMIN, user_role_enum_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: "Reject property (Admin only)",
        description: "Reject a pending property listing with a reason. Only super admins and admins can reject properties."
    }),
    (0, swagger_1.ApiParam)({
        name: "id",
        description: "Property unique identifier",
        example: "507f1f77bcf86cd799439013"
    }),
    (0, swagger_1.ApiBody)({
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
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Property rejected successfully",
        type: property_response_dto_1.PropertyResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing JWT token",
        type: error_response_dto_1.UnauthorizedResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: "Forbidden - insufficient permissions",
        type: error_response_dto_1.ErrorResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Property not found",
        type: error_response_dto_1.NotFoundResponseDto
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('reason')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "rejectProperty", null);
__decorate([
    (0, common_1.Get)('owner/:ownerId'),
    (0, swagger_1.ApiOperation)({
        summary: "Get properties by owner",
        description: "Retrieve all properties owned by a specific user."
    }),
    (0, swagger_1.ApiParam)({
        name: "ownerId",
        description: "Owner's user ID",
        example: "507f1f77bcf86cd799439011"
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Returns owner's properties",
        type: [property_response_dto_1.PropertyResponseDto]
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Owner not found or has no properties",
        type: error_response_dto_1.NotFoundResponseDto
    }),
    __param(0, (0, common_1.Param)('ownerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "getPropertiesByOwner", null);
__decorate([
    (0, common_1.Post)(":propertyId/reviews"),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: "Create a property review",
        description: "Create a review for a property. Users must be authenticated to leave reviews."
    }),
    (0, swagger_1.ApiParam)({
        name: "propertyId",
        description: "Property unique identifier",
        example: "507f1f77bcf86cd799439013"
    }),
    (0, swagger_1.ApiBody)({
        type: create_review_dto_1.CreateReviewDto,
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
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Review created successfully",
        type: review_response_dto_1.ReviewResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing JWT token",
        type: error_response_dto_1.UnauthorizedResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Property not found",
        type: error_response_dto_1.NotFoundResponseDto
    }),
    __param(0, (0, common_1.Param)('propertyId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_review_dto_1.CreateReviewDto, Object]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "createReview", null);
__decorate([
    (0, common_1.Get)(':propertyId/reviews'),
    (0, swagger_1.ApiOperation)({
        summary: "Get all reviews for a property",
        description: "Retrieve all reviews for a specific property with user information and average rating."
    }),
    (0, swagger_1.ApiParam)({
        name: "propertyId",
        description: "Property unique identifier",
        example: "507f1f77bcf86cd799439013"
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Returns property reviews with average rating",
        type: review_response_dto_1.PropertyReviewsResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Property not found",
        type: error_response_dto_1.NotFoundResponseDto
    }),
    __param(0, (0, common_1.Param)('propertyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "getPropertyReviews", null);
__decorate([
    (0, common_1.Get)(':propertyId/reviews/rating'),
    (0, swagger_1.ApiOperation)({
        summary: "Get average rating for a property",
        description: "Get the average rating and rating distribution for a specific property."
    }),
    (0, swagger_1.ApiParam)({
        name: "propertyId",
        description: "Property unique identifier",
        example: "507f1f77bcf86cd799439013"
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Returns average rating and distribution",
        type: review_response_dto_1.AverageRatingResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Property not found",
        type: error_response_dto_1.NotFoundResponseDto
    }),
    __param(0, (0, common_1.Param)('propertyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "getAverageRating", null);
exports.PropertiesController = PropertiesController = __decorate([
    (0, swagger_1.ApiTags)("Properties"),
    (0, common_1.Controller)("properties"),
    __metadata("design:paramtypes", [properties_service_1.PropertiesService])
], PropertiesController);
//# sourceMappingURL=properties.controller.js.map