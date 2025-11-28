import { Controller, Get, Post, Param, UseGuards, Patch, Body } from "@nestjs/common"
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger"
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
  @ApiOperation({ summary: "Create a new investment project" })
  @ApiResponse({ status: 201, description: "Project created successfully" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  async createProject(@Body() createProjectDto: CreateInvestmentProjectDto, @CurrentUser() user: any) {
    return this.investmentsService.createProject(createProjectDto, user.id)
  }

  @Get("projects")
  @ApiOperation({ summary: "Get all investment projects" })
  @ApiResponse({ status: 200, description: "Returns all projects" })
  async getAllProjects() {
    return this.investmentsService.getAllProjects()
  }

  @Get("projects/opportunities")
  @ApiOperation({ summary: "Get investment opportunities" })
  @ApiResponse({ status: 200, description: "Returns active investment opportunities" })
  async getOpportunities() {
    return this.investmentsService.getInvestmentOpportunities()
  }

  @Get('projects/:id')
  @ApiOperation({ summary: "Get project by ID" })
  @ApiParam({ name: "id", description: "Project ID" })
  @ApiResponse({ status: 200, description: "Returns project details" })
  @ApiResponse({ status: 404, description: "Project not found" })
  async getProjectById(@Param('id') id: string) {
    return this.investmentsService.getProjectById(id);
  }

  @Get('projects/:id/stats')
  @ApiOperation({ summary: "Get project statistics" })
  @ApiParam({ name: "id", description: "Project ID" })
  @ApiResponse({ status: 200, description: "Returns project statistics" })
  async getProjectStats(@Param('id') id: string) {
    return this.investmentsService.getProjectStats(id);
  }

  @Patch("projects/:id")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Update investment project" })
  @ApiParam({ name: "id", description: "Project ID" })
  @ApiResponse({ status: 200, description: "Project updated successfully" })
  async updateProject(@Param('id') id: string, @Body() updateDto: any, @CurrentUser() user: any) {
    return this.investmentsService.updateProject(id, updateDto, user.id)
  }

  @Post("projects/:id/activate")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Activate investment project" })
  @ApiParam({ name: "id", description: "Project ID" })
  @ApiResponse({ status: 200, description: "Project activated successfully" })
  async activateProject(@Param('id') id: string, @CurrentUser() user: any) {
    return this.investmentsService.activateProject(id, user.id)
  }

  @Get('projects/:id/investors')
  @ApiOperation({ summary: "Get project investors" })
  @ApiParam({ name: "id", description: "Project ID" })
  @ApiResponse({ status: 200, description: "Returns project investments" })
  async getProjectInvestments(@Param('id') id: string) {
    return this.investmentsService.getProjectInvestments(id);
  }

  // Investments
  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Create a new investment" })
  @ApiResponse({ status: 201, description: "Investment created successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async createInvestment(@Body() createInvestmentDto: CreateInvestmentDto, @CurrentUser() user: any) {
    return this.investmentsService.createInvestment(createInvestmentDto, user.id)
  }

  @Get('my-investments')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Get current user's investments" })
  @ApiResponse({ status: 200, description: "Returns user investments" })
  async getMyInvestments(@CurrentUser() user: any) {
    return this.investmentsService.getInvestmentsByInvestor(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: "Get investment by ID" })
  @ApiParam({ name: "id", description: "Investment ID" })
  @ApiResponse({ status: 200, description: "Returns investment details" })
  @ApiResponse({ status: 404, description: "Investment not found" })
  async getInvestmentById(@Param('id') id: string) {
    return this.investmentsService.getInvestmentById(id);
  }

  @Post(':id/approve')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiOperation({ summary: "Approve investment (Admin only)" })
  @ApiParam({ name: "id", description: "Investment ID" })
  @ApiResponse({ status: 200, description: "Investment approved successfully" })
  async approveInvestment(@Param('id') id: string) {
    return this.investmentsService.approveInvestment(id);
  }

  @Post(":id/withdraw")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Withdraw investment" })
  @ApiParam({ name: "id", description: "Investment ID" })
  @ApiResponse({ status: 200, description: "Investment withdrawn successfully" })
  async withdrawInvestment(@Param('id') id: string, @CurrentUser() user: any) {
    return this.investmentsService.withdrawInvestment(id, user.id)
  }
}
