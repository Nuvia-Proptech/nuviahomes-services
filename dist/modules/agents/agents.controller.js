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
exports.AgentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const agents_service_1 = require("./agents.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const agent_response_dto_1 = require("./dto/agent-response.dto");
const error_response_dto_1 = require("../../common/dto/error-response.dto");
let AgentsController = class AgentsController {
    agentsService;
    constructor(agentsService) {
        this.agentsService = agentsService;
    }
    async getAllAgents() {
        return this.agentsService.getAllAgents();
    }
    async getProfile(userId) {
        return this.agentsService.getProfile(userId);
    }
    async getMyProfile(user) {
        return this.agentsService.getProfile(user.id);
    }
    async updateMyProfile(updateDto, user) {
        return this.agentsService.updateProfile(user.id, updateDto);
    }
};
exports.AgentsController = AgentsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: "Get all agents",
        description: "Retrieve a list of all registered real estate agents in the system."
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Returns list of all agents",
        type: [agent_response_dto_1.AgentResponseDto]
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AgentsController.prototype, "getAllAgents", null);
__decorate([
    (0, common_1.Get)(':userId'),
    (0, swagger_1.ApiOperation)({
        summary: "Get agent profile by user ID",
        description: "Retrieve detailed profile information for a specific agent by their user ID."
    }),
    (0, swagger_1.ApiParam)({
        name: "userId",
        description: "User ID of the agent",
        example: "507f1f77bcf86cd799439013"
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Returns agent profile",
        type: agent_response_dto_1.AgentResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Agent not found",
        type: error_response_dto_1.NotFoundResponseDto
    }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AgentsController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)('profile/me'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: "Get current agent's profile",
        description: "Retrieve the profile information for the currently authenticated agent."
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Returns current agent profile",
        type: agent_response_dto_1.AgentResponseDto
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
], AgentsController.prototype, "getMyProfile", null);
__decorate([
    (0, common_1.Patch)("profile/me"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: "Update current agent's profile",
        description: "Update profile information for the currently authenticated agent."
    }),
    (0, swagger_1.ApiBody)({
        type: agent_response_dto_1.AgentUpdateDto,
        description: "Agent profile update data"
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Profile updated successfully",
        type: agent_response_dto_1.AgentResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing JWT token",
        type: error_response_dto_1.UnauthorizedResponseDto
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [agent_response_dto_1.AgentUpdateDto, Object]),
    __metadata("design:returntype", Promise)
], AgentsController.prototype, "updateMyProfile", null);
exports.AgentsController = AgentsController = __decorate([
    (0, swagger_1.ApiTags)("Agents"),
    (0, common_1.Controller)("agents"),
    __metadata("design:paramtypes", [agents_service_1.AgentsService])
], AgentsController);
//# sourceMappingURL=agents.controller.js.map