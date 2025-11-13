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
exports.InvestmentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const investments_service_1 = require("./investments.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const user_role_enum_1 = require("../../common/enums/user-role.enum");
let InvestmentsController = class InvestmentsController {
    investmentsService;
    constructor(investmentsService) {
        this.investmentsService = investmentsService;
    }
    async createProject(createProjectDto, user) {
        return this.investmentsService.createProject(createProjectDto, user.id);
    }
    async getAllProjects() {
        return this.investmentsService.getAllProjects();
    }
    async getOpportunities() {
        return this.investmentsService.getInvestmentOpportunities();
    }
    async getProjectById(id) {
        return this.investmentsService.getProjectById(id);
    }
    async getProjectStats(id) {
        return this.investmentsService.getProjectStats(id);
    }
    async updateProject(id, updateDto, user) {
        return this.investmentsService.updateProject(id, updateDto, user.id);
    }
    async activateProject(id, user) {
        return this.investmentsService.activateProject(id, user.id);
    }
    async getProjectInvestments(id) {
        return this.investmentsService.getProjectInvestments(id);
    }
    async createInvestment(createInvestmentDto, user) {
        return this.investmentsService.createInvestment(createInvestmentDto, user.id);
    }
    async getMyInvestments(user) {
        return this.investmentsService.getInvestmentsByInvestor(user.id);
    }
    async getInvestmentById(id) {
        return this.investmentsService.getInvestmentById(id);
    }
    async approveInvestment(id) {
        return this.investmentsService.approveInvestment(id);
    }
    async withdrawInvestment(id, user) {
        return this.investmentsService.withdrawInvestment(id, user.id);
    }
};
exports.InvestmentsController = InvestmentsController;
__decorate([
    (0, common_1.Post)("projects"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.PROPERTY_OWNER, user_role_enum_1.UserRole.SUPER_ADMIN),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Object]),
    __metadata("design:returntype", Promise)
], InvestmentsController.prototype, "createProject", null);
__decorate([
    (0, common_1.Get)("projects"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InvestmentsController.prototype, "getAllProjects", null);
__decorate([
    (0, common_1.Get)("projects/opportunities"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InvestmentsController.prototype, "getOpportunities", null);
__decorate([
    (0, common_1.Get)('projects/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvestmentsController.prototype, "getProjectById", null);
__decorate([
    (0, common_1.Get)('projects/:id/stats'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvestmentsController.prototype, "getProjectStats", null);
__decorate([
    (0, common_1.Patch)("projects/:id"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], InvestmentsController.prototype, "updateProject", null);
__decorate([
    (0, common_1.Post)("projects/:id/activate"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InvestmentsController.prototype, "activateProject", null);
__decorate([
    (0, common_1.Get)('projects/:id/investors'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvestmentsController.prototype, "getProjectInvestments", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Object]),
    __metadata("design:returntype", Promise)
], InvestmentsController.prototype, "createInvestment", null);
__decorate([
    (0, common_1.Get)('my-investments'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InvestmentsController.prototype, "getMyInvestments", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvestmentsController.prototype, "getInvestmentById", null);
__decorate([
    (0, common_1.Post)(':id/approve'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPER_ADMIN, user_role_enum_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvestmentsController.prototype, "approveInvestment", null);
__decorate([
    (0, common_1.Post)(":id/withdraw"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InvestmentsController.prototype, "withdrawInvestment", null);
exports.InvestmentsController = InvestmentsController = __decorate([
    (0, swagger_1.ApiTags)("Investments"),
    (0, common_1.Controller)("investments"),
    __metadata("design:paramtypes", [investments_service_1.InvestmentsService])
], InvestmentsController);
//# sourceMappingURL=investments.controller.js.map