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
const agent_upgrade_request_dto_1 = require("./dto/agent-upgrade-request.dto");
const agent_approval_dto_1 = require("./dto/agent-approval.dto");
const agent_request_response_dto_1 = require("./dto/agent-request-response.dto");
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
    async submitUpgradeRequest(upgradeRequestDto, user) {
        return this.agentsService.submitUpgradeRequest(user.id, upgradeRequestDto);
    }
    async getUpgradeRequests(status) {
        return this.agentsService.getUpgradeRequests(status);
    }
    async getMyUpgradeRequest(user) {
        return this.agentsService.getUserUpgradeRequest(user.id);
    }
    async processUpgradeRequest(requestId, approvalDto, user) {
        return this.agentsService.processUpgradeRequest(requestId, approvalDto, user.id);
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
__decorate([
    (0, common_1.Post)("upgrade-request"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: "Submit agent upgrade request",
        description: "Submit a request to upgrade user account to agent status."
    }),
    (0, swagger_1.ApiBody)({
        type: agent_upgrade_request_dto_1.AgentUpgradeRequestDto,
        description: "Agent upgrade request data"
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Upgrade request submitted successfully",
        type: agent_request_response_dto_1.AgentRequestResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Bad request - User already has pending request or is already an agent",
        type: error_response_dto_1.BadRequestResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing JWT token",
        type: error_response_dto_1.UnauthorizedResponseDto
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [agent_upgrade_request_dto_1.AgentUpgradeRequestDto, Object]),
    __metadata("design:returntype", Promise)
], AgentsController.prototype, "submitUpgradeRequest", null);
__decorate([
    (0, common_1.Get)("upgrade-requests"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: "Get all upgrade requests (Admin only)",
        description: "Retrieve all agent upgrade requests. Optionally filter by status."
    }),
    (0, swagger_1.ApiQuery)({
        name: "status",
        required: false,
        enum: ["pending", "approved", "rejected"],
        description: "Filter requests by status"
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Returns list of upgrade requests",
        type: [agent_request_response_dto_1.AgentRequestResponseDto]
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing JWT token",
        type: error_response_dto_1.UnauthorizedResponseDto
    }),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AgentsController.prototype, "getUpgradeRequests", null);
__decorate([
    (0, common_1.Get)("upgrade-request/me"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: "Get current user's upgrade request",
        description: "Retrieve the upgrade request for the currently authenticated user."
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Returns user's upgrade request",
        type: agent_request_response_dto_1.AgentRequestResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "No upgrade request found for user",
        type: error_response_dto_1.NotFoundResponseDto
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
], AgentsController.prototype, "getMyUpgradeRequest", null);
__decorate([
    (0, common_1.Patch)("upgrade-requests/:requestId/process"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: "Process upgrade request (Admin only)",
        description: "Approve or reject an agent upgrade request."
    }),
    (0, swagger_1.ApiParam)({
        name: "requestId",
        description: "ID of the upgrade request to process",
        example: "507f1f77bcf86cd799439013"
    }),
    (0, swagger_1.ApiBody)({
        type: agent_approval_dto_1.AgentApprovalDto,
        description: "Approval decision and comments"
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Request processed successfully",
        type: agent_request_response_dto_1.AgentRequestResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Bad request - Request already processed",
        type: error_response_dto_1.BadRequestResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Upgrade request not found",
        type: error_response_dto_1.NotFoundResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing JWT token",
        type: error_response_dto_1.UnauthorizedResponseDto
    }),
    __param(0, (0, common_1.Param)('requestId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, agent_approval_dto_1.AgentApprovalDto, Object]),
    __metadata("design:returntype", Promise)
], AgentsController.prototype, "processUpgradeRequest", null);
exports.AgentsController = AgentsController = __decorate([
    (0, swagger_1.ApiTags)("Agents"),
    (0, common_1.Controller)("agents"),
    __metadata("design:paramtypes", [agents_service_1.AgentsService])
], AgentsController);
//# sourceMappingURL=agents.controller.js.map