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
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const user_role_enum_1 = require("../../common/enums/user-role.enum");
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
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.PROPERTY_OWNER, user_role_enum_1.UserRole.AGENT, user_role_enum_1.UserRole.SUPER_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: "Create a new property listing" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "Property created successfully" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Forbidden - insufficient permissions" }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Object]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get all properties with filters" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Returns filtered properties" }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("featured"),
    (0, swagger_1.ApiOperation)({ summary: "Get featured properties" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Returns featured properties" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "getFeatured", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: "Get property by ID" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Property ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Returns property details" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Property not found" }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: "Update property" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Property ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Property updated successfully" }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: "Delete property" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Property ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Property deleted successfully" }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(":id/approve"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPER_ADMIN, user_role_enum_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: "Approve property (Admin only)" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Property ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Property approved successfully" }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "approveProperty", null);
__decorate([
    (0, common_1.Post)(":id/reject"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPER_ADMIN, user_role_enum_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: "Reject property (Admin only)" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Property ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Property rejected successfully" }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('reason')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "rejectProperty", null);
__decorate([
    (0, common_1.Get)('owner/:ownerId'),
    (0, swagger_1.ApiOperation)({ summary: "Get properties by owner" }),
    (0, swagger_1.ApiParam)({ name: "ownerId", description: "Owner ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Returns owner's properties" }),
    __param(0, (0, common_1.Param)('ownerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "getPropertiesByOwner", null);
__decorate([
    (0, common_1.Post)(":propertyId/reviews"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: "Create a property review" }),
    (0, swagger_1.ApiParam)({ name: "propertyId", description: "Property ID" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "Review created successfully" }),
    __param(0, (0, common_1.Param)('propertyId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function, Object]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "createReview", null);
__decorate([
    (0, common_1.Get)(':propertyId/reviews'),
    (0, swagger_1.ApiOperation)({ summary: "Get all reviews for a property" }),
    (0, swagger_1.ApiParam)({ name: "propertyId", description: "Property ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Returns property reviews" }),
    __param(0, (0, common_1.Param)('propertyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "getPropertyReviews", null);
__decorate([
    (0, common_1.Get)(':propertyId/reviews/rating'),
    (0, swagger_1.ApiOperation)({ summary: "Get average rating for a property" }),
    (0, swagger_1.ApiParam)({ name: "propertyId", description: "Property ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Returns average rating" }),
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