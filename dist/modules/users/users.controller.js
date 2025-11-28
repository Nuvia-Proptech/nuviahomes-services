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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("./users.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const user_role_enum_1 = require("../../common/enums/user-role.enum");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    async findAll(role, isActive) {
        return this.usersService.findAll(role, isActive);
    }
    async findOne(id) {
        return this.usersService.findById(id);
    }
    async update(id, updateUserDto, currentUser) {
        if (currentUser.id !== id && currentUser.role !== user_role_enum_1.UserRole.SUPER_ADMIN) {
            throw new Error("Unauthorized");
        }
        return this.usersService.update(id, updateUserDto);
    }
    async remove(id) {
        return this.usersService.remove(id);
    }
    async approveUser(id, currentUser) {
        return this.usersService.approveUser(id, currentUser.id);
    }
    async rejectUser(id) {
        return this.usersService.rejectUser(id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPER_ADMIN, user_role_enum_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: "Get all users (Admin only)" }),
    (0, swagger_1.ApiQuery)({ name: "role", required: false, enum: user_role_enum_1.UserRole, description: "Filter by user role" }),
    (0, swagger_1.ApiQuery)({ name: "isActive", required: false, type: Boolean, description: "Filter by active status" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Returns list of users" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Forbidden" }),
    __param(0, (0, common_1.Query)('role')),
    __param(1, (0, common_1.Query)('isActive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: "Get user by ID" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "User ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Returns user details" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "User not found" }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: "Update user profile" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "User ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "User updated successfully" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Forbidden" }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPER_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: "Delete user (Super Admin only)" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "User ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "User deleted successfully" }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(":id/approve"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPER_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: "Approve user (Super Admin only)" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "User ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "User approved successfully" }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "approveUser", null);
__decorate([
    (0, common_1.Post)(':id/reject'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPER_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: "Reject user (Super Admin only)" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "User ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "User rejected successfully" }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "rejectUser", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)("Users"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)("users"),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map