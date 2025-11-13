import { Controller, Get, Patch, Body, Param, UseGuards } from "@nestjs/common"
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger"
import { AgentsService } from "./agents.service"
import { JwtAuthGuard } from "@/modules/auth/guards/jwt-auth.guard"
import { CurrentUser } from "@/modules/auth/decorators/current-user.decorator"

@ApiTags("Agents")
@ApiBearerAuth()
@Controller("agents")
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Get()
  async getAllAgents() {
    return this.agentsService.getAllAgents()
  }

  @Get(':userId')
  async getProfile(@Param('userId') userId: string) {
    return this.agentsService.getProfile(userId);
  }

  @Get('profile/me')
  @UseGuards(JwtAuthGuard)
  async getMyProfile(@CurrentUser() user: any) {
    return this.agentsService.getProfile(user.id);
  }

  @Patch("profile/me")
  @UseGuards(JwtAuthGuard)
  async updateMyProfile(@Body() updateDto: any, @CurrentUser() user: any) {
    return this.agentsService.updateProfile(user.id, updateDto)
  }
}
