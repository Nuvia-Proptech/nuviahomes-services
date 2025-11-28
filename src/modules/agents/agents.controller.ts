import { Controller, Get, Patch, Body, Param, UseGuards } from "@nestjs/common"
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger"
import { AgentsService } from "./agents.service"
import { JwtAuthGuard } from "@/modules/auth/guards/jwt-auth.guard"
import { CurrentUser } from "@/modules/auth/decorators/current-user.decorator"

@ApiTags("Agents")
@Controller("agents")
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Get()
  @ApiOperation({ summary: "Get all agents" })
  @ApiResponse({ status: 200, description: "Returns list of all agents" })
  async getAllAgents() {
    return this.agentsService.getAllAgents()
  }

  @Get(':userId')
  @ApiOperation({ summary: "Get agent profile by user ID" })
  @ApiParam({ name: "userId", description: "User ID" })
  @ApiResponse({ status: 200, description: "Returns agent profile" })
  @ApiResponse({ status: 404, description: "Agent not found" })
  async getProfile(@Param('userId') userId: string) {
    return this.agentsService.getProfile(userId);
  }

  @Get('profile/me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get current agent's profile" })
  @ApiResponse({ status: 200, description: "Returns current agent profile" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async getMyProfile(@CurrentUser() user: any) {
    return this.agentsService.getProfile(user.id);
  }

  @Patch("profile/me")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update current agent's profile" })
  @ApiResponse({ status: 200, description: "Profile updated successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async updateMyProfile(@Body() updateDto: any, @CurrentUser() user: any) {
    return this.agentsService.updateProfile(user.id, updateDto)
  }
}
