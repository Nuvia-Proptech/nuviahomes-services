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
const create_investment_project_dto_1 = require("./dto/create-investment-project.dto");
const create_investment_dto_1 = require("./dto/create-investment.dto");
const investment_response_dto_1 = require("./dto/investment-response.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const user_role_enum_1 = require("../../common/enums/user-role.enum");
const error_response_dto_1 = require("../../common/dto/error-response.dto");
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
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.PROPERTY_OWNER, user_role_enum_1.UserRole.SUPER_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: "Create a new investment project",
        description: "Create a new investment project for crowdfunding. Only property owners and super admins can create projects."
    }),
    (0, swagger_1.ApiBody)({
        type: create_investment_project_dto_1.CreateInvestmentProjectDto,
        examples: {
            apartmentComplex: {
                summary: "Apartment Complex Project",
                description: "Example of a residential apartment complex investment project",
                value: {
                    title: "Luxury Downtown Apartment Complex",
                    description: "A premium 50-unit apartment complex in the heart of downtown, featuring modern amenities, rooftop garden, and premium finishes. Expected completion in 18 months with guaranteed returns.",
                    imageUrl: "https://example.com/project-main-image.jpg",
                    minimumInvestment: 10000,
                    targetAmount: 5000000,
                    expectedROI: 15.5,
                    investmentDuration: "18 months",
                    location: "Downtown Manhattan, New York",
                    highlights: [
                        "Prime downtown location",
                        "Modern architectural design",
                        "Guaranteed rental income",
                        "Professional property management",
                        "Tax benefits available"
                    ]
                }
            },
            commercialProject: {
                summary: "Commercial Development",
                description: "Example of a commercial real estate investment project",
                value: {
                    title: "Modern Office Complex Development",
                    description: "State-of-the-art office complex with smart building technology, targeting tech companies and startups.",
                    minimumInvestment: 25000,
                    targetAmount: 12000000,
                    expectedROI: 18.0,
                    investmentDuration: "24 months",
                    location: "Silicon Valley, California",
                    highlights: [
                        "Tech hub location",
                        "Smart building technology",
                        "Pre-leased to major tenants",
                        "LEED certified design"
                    ]
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Project created successfully",
        type: investment_response_dto_1.InvestmentProjectResponseDto
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
    __metadata("design:paramtypes", [create_investment_project_dto_1.CreateInvestmentProjectDto, Object]),
    __metadata("design:returntype", Promise)
], InvestmentsController.prototype, "createProject", null);
__decorate([
    (0, common_1.Get)("projects"),
    (0, swagger_1.ApiOperation)({
        summary: "Get all investment projects",
        description: "Retrieve a list of all investment projects available for investment."
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Returns all projects",
        type: [investment_response_dto_1.InvestmentProjectResponseDto]
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InvestmentsController.prototype, "getAllProjects", null);
__decorate([
    (0, common_1.Get)("projects/opportunities"),
    (0, swagger_1.ApiOperation)({
        summary: "Get investment opportunities",
        description: "Retrieve active investment opportunities that are currently accepting investments."
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Returns active investment opportunities",
        type: [investment_response_dto_1.InvestmentProjectResponseDto]
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InvestmentsController.prototype, "getOpportunities", null);
__decorate([
    (0, common_1.Get)('projects/:id'),
    (0, swagger_1.ApiOperation)({
        summary: "Get project by ID",
        description: "Retrieve detailed information about a specific investment project."
    }),
    (0, swagger_1.ApiParam)({
        name: "id",
        description: "Project unique identifier",
        example: "507f1f77bcf86cd799439013"
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Returns project details",
        type: investment_response_dto_1.InvestmentProjectResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Project not found",
        type: error_response_dto_1.NotFoundResponseDto
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvestmentsController.prototype, "getProjectById", null);
__decorate([
    (0, common_1.Get)('projects/:id/stats'),
    (0, swagger_1.ApiOperation)({
        summary: "Get project statistics",
        description: "Retrieve funding statistics and metrics for a specific investment project."
    }),
    (0, swagger_1.ApiParam)({
        name: "id",
        description: "Project unique identifier",
        example: "507f1f77bcf86cd799439013"
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Returns project statistics",
        type: investment_response_dto_1.ProjectStatsResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Project not found",
        type: error_response_dto_1.NotFoundResponseDto
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvestmentsController.prototype, "getProjectStats", null);
__decorate([
    (0, common_1.Patch)("projects/:id"),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: "Update investment project",
        description: "Update project information. Only the project creator or admin can update a project."
    }),
    (0, swagger_1.ApiParam)({
        name: "id",
        description: "Project unique identifier",
        example: "507f1f77bcf86cd799439013"
    }),
    (0, swagger_1.ApiBody)({
        type: investment_response_dto_1.UpdateInvestmentProjectDto,
        examples: {
            updateDetails: {
                summary: "Update Project Details",
                description: "Update project information and timeline",
                value: {
                    title: "Updated Luxury Downtown Apartment Complex",
                    description: "Updated description with new features and timeline adjustments.",
                    expectedROI: 16.0,
                    investmentDuration: "20 months",
                    highlights: [
                        "Prime downtown location",
                        "Modern architectural design",
                        "Guaranteed rental income",
                        "Professional property management",
                        "Tax benefits available",
                        "Updated: Green building certification"
                    ]
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Project updated successfully",
        type: investment_response_dto_1.InvestmentProjectResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing JWT token",
        type: error_response_dto_1.UnauthorizedResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: "Forbidden - insufficient permissions to update this project",
        type: error_response_dto_1.ErrorResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Project not found",
        type: error_response_dto_1.NotFoundResponseDto
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, investment_response_dto_1.UpdateInvestmentProjectDto, Object]),
    __metadata("design:returntype", Promise)
], InvestmentsController.prototype, "updateProject", null);
__decorate([
    (0, common_1.Post)("projects/:id/activate"),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: "Activate investment project",
        description: "Activate a project to start accepting investments. Only the project creator or admin can activate a project."
    }),
    (0, swagger_1.ApiParam)({
        name: "id",
        description: "Project unique identifier",
        example: "507f1f77bcf86cd799439013"
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Project activated successfully",
        type: investment_response_dto_1.InvestmentProjectResponseDto
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
        description: "Project not found",
        type: error_response_dto_1.NotFoundResponseDto
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InvestmentsController.prototype, "activateProject", null);
__decorate([
    (0, common_1.Get)('projects/:id/investors'),
    (0, swagger_1.ApiOperation)({
        summary: "Get project investors",
        description: "Retrieve a list of all investors who have invested in a specific project."
    }),
    (0, swagger_1.ApiParam)({
        name: "id",
        description: "Project unique identifier",
        example: "507f1f77bcf86cd799439013"
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Returns project investments and investor information",
        type: investment_response_dto_1.ProjectInvestmentsResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Project not found",
        type: error_response_dto_1.NotFoundResponseDto
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvestmentsController.prototype, "getProjectInvestments", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: "Create a new investment",
        description: "Make an investment in a property or project. Users must be authenticated to invest."
    }),
    (0, swagger_1.ApiBody)({
        type: create_investment_dto_1.CreateInvestmentDto,
        examples: {
            projectInvestment: {
                summary: "Project Investment",
                description: "Invest in an investment project",
                value: {
                    investmentType: "project",
                    projectId: "507f1f77bcf86cd799439013",
                    amount: 25000,
                    shares: 100,
                    notes: "Investment made through referral program"
                }
            },
            propertyInvestment: {
                summary: "Property Investment",
                description: "Invest directly in a property",
                value: {
                    investmentType: "property",
                    propertyId: "507f1f77bcf86cd799439015",
                    amount: 50000,
                    notes: "Direct property investment for rental income"
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Investment created successfully",
        type: investment_response_dto_1.InvestmentResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing JWT token",
        type: error_response_dto_1.UnauthorizedResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Bad request - Invalid investment data or insufficient funds",
        type: error_response_dto_1.ErrorResponseDto
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_investment_dto_1.CreateInvestmentDto, Object]),
    __metadata("design:returntype", Promise)
], InvestmentsController.prototype, "createInvestment", null);
__decorate([
    (0, common_1.Get)('my-investments'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: "Get current user's investments",
        description: "Retrieve all investments made by the currently authenticated user."
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Returns user investments",
        type: [investment_response_dto_1.InvestmentResponseDto]
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing JWT token",
        type: error_response_dto_1.UnauthorizedResponseDto
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InvestmentsController.prototype, "getMyInvestments", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: "Get investment by ID",
        description: "Retrieve detailed information about a specific investment."
    }),
    (0, swagger_1.ApiParam)({
        name: "id",
        description: "Investment unique identifier",
        example: "507f1f77bcf86cd799439014"
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Returns investment details",
        type: investment_response_dto_1.InvestmentResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Investment not found",
        type: error_response_dto_1.NotFoundResponseDto
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvestmentsController.prototype, "getInvestmentById", null);
__decorate([
    (0, common_1.Post)(':id/approve'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPER_ADMIN, user_role_enum_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: "Approve investment (Admin only)",
        description: "Approve a pending investment. Only super admins and admins can approve investments."
    }),
    (0, swagger_1.ApiParam)({
        name: "id",
        description: "Investment unique identifier",
        example: "507f1f77bcf86cd799439014"
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Investment approved successfully",
        type: investment_response_dto_1.InvestmentResponseDto
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
        description: "Investment not found",
        type: error_response_dto_1.NotFoundResponseDto
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvestmentsController.prototype, "approveInvestment", null);
__decorate([
    (0, common_1.Post)(":id/withdraw"),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: "Withdraw investment",
        description: "Withdraw from an investment (if allowed by investment terms). Only the investor can withdraw their own investment."
    }),
    (0, swagger_1.ApiParam)({
        name: "id",
        description: "Investment unique identifier",
        example: "507f1f77bcf86cd799439014"
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Investment withdrawn successfully",
        type: investment_response_dto_1.InvestmentResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing JWT token",
        type: error_response_dto_1.UnauthorizedResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: "Forbidden - cannot withdraw this investment",
        type: error_response_dto_1.ErrorResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Investment not found",
        type: error_response_dto_1.NotFoundResponseDto
    }),
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