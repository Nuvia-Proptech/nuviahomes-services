import { Controller, Get, Post, Patch, Body, Param, UseGuards, Query } from "@nestjs/common"
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from "@nestjs/swagger"
import { AgentsService } from "./agents.service"
import { JwtAuthGuard } from "@/modules/auth/guards/jwt-auth.guard"
import { CurrentUser } from "@/modules/auth/decorators/current-user.decorator"
import { AgentResponseDto, AgentUpdateDto } from "./dto/agent-response.dto"
import { AgentUpgradeRequestDto } from "./dto/agent-upgrade-request.dto"
import { AgentApprovalDto } from "./dto/agent-approval.dto"
import { AgentRequestResponseDto } from "./dto/agent-request-response.dto"
import { NotFoundResponseDto, UnauthorizedResponseDto, BadRequestResponseDto } from "@/common/dto/error-response.dto"

@ApiTags("Agents")
@Controller("agents")
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Get()
  @ApiOperation({ 
    summary: "Get all agents",
    description: "Retrieve a list of all registered real estate agents in the system."
  })
  @ApiResponse({ 
    status: 200, 
    description: "Returns list of all agents",
    type: [AgentResponseDto]
  })
  async getAllAgents() {
    return this.agentsService.getAllAgents()
  }

  @Get(':userId')
  @ApiOperation({ 
    summary: "Get agent profile by user ID",
    description: "Retrieve detailed profile information for a specific agent by their user ID."
  })
  @ApiParam({ 
    name: "userId", 
    description: "User ID of the agent",
    example: "507f1f77bcf86cd799439013"
  })
  @ApiResponse({ 
    status: 200, 
    description: "Returns agent profile",
    type: AgentResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: "Agent not found",
    type: NotFoundResponseDto
  })
  async getProfile(@Param('userId') userId: string) {
    return this.agentsService.getProfile(userId);
  }

  @Get('profile/me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: "Get current agent's profile",
    description: "Retrieve the profile information for the currently authenticated agent."
  })
  @ApiResponse({ 
    status: 200, 
    description: "Returns current agent profile",
    type: AgentResponseDto
  })
  @ApiResponse({ 
    status: 401, 
    description: "Unauthorized - Invalid or missing JWT token",
    type: UnauthorizedResponseDto
  })
  async getMyProfile(@CurrentUser() user: any) {
    return this.agentsService.getProfile(user.id);
  }

  @Patch("profile/me")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: "Update current agent's profile",
    description: "Update profile information for the currently authenticated agent."
  })
  @ApiBody({
    type: AgentUpdateDto,
    description: "Agent profile update data"
  })
  @ApiResponse({ 
    status: 200, 
    description: "Profile updated successfully",
    type: AgentResponseDto
  })
  @ApiResponse({ 
    status: 401, 
    description: "Unauthorized - Invalid or missing JWT token",
    type: UnauthorizedResponseDto
  })
  async updateMyProfile(@Body() updateDto: AgentUpdateDto, @CurrentUser() user: any) {
    return this.agentsService.updateProfile(user.id, updateDto)
  }

  // Agent upgrade request endpoints
  @Post("upgrade-request")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: "Submit agent upgrade request",
    description: "Submit a request to upgrade user account to agent status."
  })
  @ApiBody({
    type: AgentUpgradeRequestDto,
    description: "Agent upgrade request data"
  })
  @ApiResponse({ 
    status: 201, 
    description: "Upgrade request submitted successfully",
    type: AgentRequestResponseDto
  })
  @ApiResponse({ 
    status: 400, 
    description: "Bad request - User already has pending request or is already an agent",
    type: BadRequestResponseDto
  })
  @ApiResponse({ 
    status: 401, 
    description: "Unauthorized - Invalid or missing JWT token",
    type: UnauthorizedResponseDto
  })
  async submitUpgradeRequest(@Body() upgradeRequestDto: AgentUpgradeRequestDto, @CurrentUser() user: any) {
    return this.agentsService.submitUpgradeRequest(user.id, upgradeRequestDto)
  }

  @Get("upgrade-requests")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: "Get all upgrade requests (Admin only)",
    description: "Retrieve all agent upgrade requests. Optionally filter by status."
  })
  @ApiQuery({ 
    name: "status", 
    required: false,
    enum: ["pending", "approved", "rejected"],
    description: "Filter requests by status"
  })
  @ApiResponse({ 
    status: 200, 
    description: "Returns list of upgrade requests",
    type: [AgentRequestResponseDto]
  })
  @ApiResponse({ 
    status: 401, 
    description: "Unauthorized - Invalid or missing JWT token",
    type: UnauthorizedResponseDto
  })
  async getUpgradeRequests(@Query('status') status?: 'pending' | 'approved' | 'rejected') {
    return this.agentsService.getUpgradeRequests(status)
  }

  @Get("upgrade-request/me")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: "Get current user's upgrade request",
    description: "Retrieve the upgrade request for the currently authenticated user."
  })
  @ApiResponse({ 
    status: 200, 
    description: "Returns user's upgrade request",
    type: AgentRequestResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: "No upgrade request found for user",
    type: NotFoundResponseDto
  })
  @ApiResponse({ 
    status: 401, 
    description: "Unauthorized - Invalid or missing JWT token",
    type: UnauthorizedResponseDto
  })
  async getMyUpgradeRequest(@CurrentUser() user: any) {
    return this.agentsService.getUserUpgradeRequest(user.id)
  }

  @Patch("upgrade-requests/:requestId/process")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: "Process upgrade request (Admin only)",
    description: "Approve or reject an agent upgrade request."
  })
  @ApiParam({ 
    name: "requestId", 
    description: "ID of the upgrade request to process",
    example: "507f1f77bcf86cd799439013"
  })
  @ApiBody({
    type: AgentApprovalDto,
    description: "Approval decision and comments"
  })
  @ApiResponse({ 
    status: 200, 
    description: "Request processed successfully",
    type: AgentRequestResponseDto
  })
  @ApiResponse({ 
    status: 400, 
    description: "Bad request - Request already processed",
    type: BadRequestResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: "Upgrade request not found",
    type: NotFoundResponseDto
  })
  @ApiResponse({ 
    status: 401, 
    description: "Unauthorized - Invalid or missing JWT token",
    type: UnauthorizedResponseDto
  })
  async processUpgradeRequest(
    @Param('requestId') requestId: string, 
    @Body() approvalDto: AgentApprovalDto, 
    @CurrentUser() user: any
  ) {
    return this.agentsService.processUpgradeRequest(requestId, approvalDto, user.id)
  }
}
