import { Controller, Get, Post, Param, UseGuards, Patch } from "@nestjs/common"
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger"
import { InvestmentsService } from "./investments.service"
import type { CreateInvestmentProjectDto } from "./dto/create-investment-project.dto"
import type { CreateInvestmentDto } from "./dto/create-investment.dto"
import { JwtAuthGuard } from "@/modules/auth/guards/jwt-auth.guard"
import { RolesGuard } from "@/modules/auth/guards/roles.guard"
import { Roles } from "@/modules/auth/decorators/roles.decorator"
import { CurrentUser } from "@/modules/auth/decorators/current-user.decorator"
import { UserRole } from "@/common/enums/user-role.enum"

@ApiTags("Investments")
@Controller("investments")
export class InvestmentsController {
  constructor(private readonly investmentsService: InvestmentsService) {}

  // Investment Projects
  @Post("projects")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.PROPERTY_OWNER, UserRole.SUPER_ADMIN)
  async createProject(createProjectDto: CreateInvestmentProjectDto, @CurrentUser() user: any) {
    return this.investmentsService.createProject(createProjectDto, user.id)
  }

  @Get("projects")
  async getAllProjects() {
    return this.investmentsService.getAllProjects()
  }

  @Get("projects/opportunities")
  async getOpportunities() {
    return this.investmentsService.getInvestmentOpportunities()
  }

  @Get('projects/:id')
  async getProjectById(@Param('id') id: string) {
    return this.investmentsService.getProjectById(id);
  }

  @Get('projects/:id/stats')
  async getProjectStats(@Param('id') id: string) {
    return this.investmentsService.getProjectStats(id);
  }

  @Patch("projects/:id")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async updateProject(@Param('id') id: string, updateDto: any, @CurrentUser() user: any) {
    return this.investmentsService.updateProject(id, updateDto, user.id)
  }

  @Post("projects/:id/activate")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async activateProject(@Param('id') id: string, @CurrentUser() user: any) {
    return this.investmentsService.activateProject(id, user.id)
  }

  @Get('projects/:id/investors')
  async getProjectInvestments(@Param('id') id: string) {
    return this.investmentsService.getProjectInvestments(id);
  }

  // Investments
  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async createInvestment(createInvestmentDto: CreateInvestmentDto, @CurrentUser() user: any) {
    return this.investmentsService.createInvestment(createInvestmentDto, user.id)
  }

  @Get('my-investments')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getMyInvestments(@CurrentUser() user: any) {
    return this.investmentsService.getInvestmentsByInvestor(user.id);
  }

  @Get(':id')
  async getInvestmentById(@Param('id') id: string) {
    return this.investmentsService.getInvestmentById(id);
  }

  @Post(':id/approve')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  async approveInvestment(@Param('id') id: string) {
    return this.investmentsService.approveInvestment(id);
  }

  @Post(":id/withdraw")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async withdrawInvestment(@Param('id') id: string, @CurrentUser() user: any) {
    return this.investmentsService.withdrawInvestment(id, user.id)
  }
}
