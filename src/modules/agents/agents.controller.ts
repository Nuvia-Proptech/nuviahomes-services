import { Controller, Get, Patch, Body, Param, UseGuards } from "@nestjs/common"
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam, ApiBody } from "@nestjs/swagger"
import { AgentsService } from "./agents.service"
import { JwtAuthGuard } from "@/modules/auth/guards/jwt-auth.guard"
import { CurrentUser } from "@/modules/auth/decorators/current-user.decorator"
import { AgentResponseDto, AgentUpdateDto } from "./dto/agent-response.dto"
import { NotFoundResponseDto, UnauthorizedResponseDto } from "@/common/dto/error-response.dto"

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
}
