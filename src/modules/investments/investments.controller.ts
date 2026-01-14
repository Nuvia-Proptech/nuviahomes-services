import { Controller, Get, Post, Param, UseGuards, Patch, Body } from "@nestjs/common"
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam, ApiBody } from "@nestjs/swagger"
import { InvestmentsService } from "./investments.service"
import { CreateInvestmentProjectDto } from "./dto/create-investment-project.dto"
import { CreateInvestmentDto } from "./dto/create-investment.dto"
import { 
  InvestmentProjectResponseDto, 
  ProjectStatsResponseDto, 
  ProjectInvestmentsResponseDto, 
  InvestmentResponseDto,
  UpdateInvestmentProjectDto
} from "./dto/investment-response.dto"
import { JwtAuthGuard } from "@/modules/auth/guards/jwt-auth.guard"
import { RolesGuard } from "@/modules/auth/guards/roles.guard"
import { Roles } from "@/modules/auth/decorators/roles.decorator"
import { CurrentUser } from "@/modules/auth/decorators/current-user.decorator"
import { UserRole } from "@/common/enums/user-role.enum"
import { ErrorResponseDto, NotFoundResponseDto, UnauthorizedResponseDto } from "@/common/dto/error-response.dto"
import { MessageResponseDto } from "@/common/dto/success-response.dto"

@ApiTags("Investments")
@Controller("investments")
export class InvestmentsController {
  constructor(private readonly investmentsService: InvestmentsService) {}

  // Investment Projects
  @Post("projects")
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.PROPERTY_OWNER, UserRole.SUPER_ADMIN)
  @ApiOperation({ 
    summary: "Create a new investment project",
    description: "Create a new investment project for crowdfunding. Only property owners and super admins can create projects."
  })
  @ApiBody({ 
    type: CreateInvestmentProjectDto,
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
  })
  @ApiResponse({ 
    status: 201, 
    description: "Project created successfully",
    type: InvestmentProjectResponseDto
  })
  @ApiResponse({ 
    status: 401, 
    description: "Unauthorized - Invalid or missing JWT token",
    type: UnauthorizedResponseDto
  })
  @ApiResponse({ 
    status: 403, 
    description: "Forbidden - insufficient permissions",
    type: ErrorResponseDto
  })
  async createProject(@Body() createProjectDto: CreateInvestmentProjectDto, @CurrentUser() user: any) {
    return this.investmentsService.createProject(createProjectDto, user.id)
  }

  @Get("projects")
  @ApiOperation({ 
    summary: "Get all investment projects",
    description: "Retrieve a list of all investment projects available for investment."
  })
  @ApiResponse({ 
    status: 200, 
    description: "Returns all projects",
    type: [InvestmentProjectResponseDto]
  })
  async getAllProjects() {
    return this.investmentsService.getAllProjects()
  }

  @Get("projects/opportunities")
  @ApiOperation({ 
    summary: "Get investment opportunities",
    description: "Retrieve active investment opportunities that are currently accepting investments."
  })
  @ApiResponse({ 
    status: 200, 
    description: "Returns active investment opportunities",
    type: [InvestmentProjectResponseDto]
  })
  async getOpportunities() {
    return this.investmentsService.getInvestmentOpportunities()
  }

  @Get('projects/:id')
  @ApiOperation({ 
    summary: "Get project by ID",
    description: "Retrieve detailed information about a specific investment project."
  })
  @ApiParam({ 
    name: "id", 
    description: "Project unique identifier",
    example: "507f1f77bcf86cd799439013"
  })
  @ApiResponse({ 
    status: 200, 
    description: "Returns project details",
    type: InvestmentProjectResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: "Project not found",
    type: NotFoundResponseDto
  })
  async getProjectById(@Param('id') id: string) {
    return this.investmentsService.getProjectById(id);
  }

  @Get('projects/:id/stats')
  @ApiOperation({ 
    summary: "Get project statistics",
    description: "Retrieve funding statistics and metrics for a specific investment project."
  })
  @ApiParam({ 
    name: "id", 
    description: "Project unique identifier",
    example: "507f1f77bcf86cd799439013"
  })
  @ApiResponse({ 
    status: 200, 
    description: "Returns project statistics",
    type: ProjectStatsResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: "Project not found",
    type: NotFoundResponseDto
  })
  async getProjectStats(@Param('id') id: string) {
    return this.investmentsService.getProjectStats(id);
  }

  @Patch("projects/:id")
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ 
    summary: "Update investment project",
    description: "Update project information. Only the project creator or admin can update a project."
  })
  @ApiParam({ 
    name: "id", 
    description: "Project unique identifier",
    example: "507f1f77bcf86cd799439013"
  })
  @ApiBody({ 
    type: UpdateInvestmentProjectDto,
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
  })
  @ApiResponse({ 
    status: 200, 
    description: "Project updated successfully",
    type: InvestmentProjectResponseDto
  })
  @ApiResponse({ 
    status: 401, 
    description: "Unauthorized - Invalid or missing JWT token",
    type: UnauthorizedResponseDto
  })
  @ApiResponse({ 
    status: 403, 
    description: "Forbidden - insufficient permissions to update this project",
    type: ErrorResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: "Project not found",
    type: NotFoundResponseDto
  })
  async updateProject(@Param('id') id: string, @Body() updateDto: UpdateInvestmentProjectDto, @CurrentUser() user: any) {
    return this.investmentsService.updateProject(id, updateDto, user.id)
  }

  @Post("projects/:id/activate")
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ 
    summary: "Activate investment project",
    description: "Activate a project to start accepting investments. Only the project creator or admin can activate a project."
  })
  @ApiParam({ 
    name: "id", 
    description: "Project unique identifier",
    example: "507f1f77bcf86cd799439013"
  })
  @ApiResponse({ 
    status: 200, 
    description: "Project activated successfully",
    type: InvestmentProjectResponseDto
  })
  @ApiResponse({ 
    status: 401, 
    description: "Unauthorized - Invalid or missing JWT token",
    type: UnauthorizedResponseDto
  })
  @ApiResponse({ 
    status: 403, 
    description: "Forbidden - insufficient permissions",
    type: ErrorResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: "Project not found",
    type: NotFoundResponseDto
  })
  async activateProject(@Param('id') id: string, @CurrentUser() user: any) {
    return this.investmentsService.activateProject(id, user.id)
  }

  @Get('projects/:id/investors')
  @ApiOperation({ 
    summary: "Get project investors",
    description: "Retrieve a list of all investors who have invested in a specific project."
  })
  @ApiParam({ 
    name: "id", 
    description: "Project unique identifier",
    example: "507f1f77bcf86cd799439013"
  })
  @ApiResponse({ 
    status: 200, 
    description: "Returns project investments and investor information",
    type: ProjectInvestmentsResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: "Project not found",
    type: NotFoundResponseDto
  })
  async getProjectInvestments(@Param('id') id: string) {
    return this.investmentsService.getProjectInvestments(id);
  }

  // Investments
  @Post()
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ 
    summary: "Create a new investment",
    description: "Make an investment in a property or project. Users must be authenticated to invest."
  })
  @ApiBody({ 
    type: CreateInvestmentDto,
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
  })
  @ApiResponse({ 
    status: 201, 
    description: "Investment created successfully",
    type: InvestmentResponseDto
  })
  @ApiResponse({ 
    status: 401, 
    description: "Unauthorized - Invalid or missing JWT token",
    type: UnauthorizedResponseDto
  })
  @ApiResponse({ 
    status: 400, 
    description: "Bad request - Invalid investment data or insufficient funds",
    type: ErrorResponseDto
  })
  async createInvestment(@Body() createInvestmentDto: CreateInvestmentDto, @CurrentUser() user: any) {
    return this.investmentsService.createInvestment(createInvestmentDto, user.id)
  }

  @Get('my-investments')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ 
    summary: "Get current user's investments",
    description: "Retrieve all investments made by the currently authenticated user."
  })
  @ApiResponse({ 
    status: 200, 
    description: "Returns user investments",
    type: [InvestmentResponseDto]
  })
  @ApiResponse({ 
    status: 401, 
    description: "Unauthorized - Invalid or missing JWT token",
    type: UnauthorizedResponseDto
  })
  async getMyInvestments(@CurrentUser() user: any) {
    return this.investmentsService.getInvestmentsByInvestor(user.id);
  }

  @Get(':id')
  @ApiOperation({ 
    summary: "Get investment by ID",
    description: "Retrieve detailed information about a specific investment."
  })
  @ApiParam({ 
    name: "id", 
    description: "Investment unique identifier",
    example: "507f1f77bcf86cd799439014"
  })
  @ApiResponse({ 
    status: 200, 
    description: "Returns investment details",
    type: InvestmentResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: "Investment not found",
    type: NotFoundResponseDto
  })
  async getInvestmentById(@Param('id') id: string) {
    return this.investmentsService.getInvestmentById(id);
  }

  @Post(':id/approve')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiOperation({ 
    summary: "Approve investment (Admin only)",
    description: "Approve a pending investment. Only super admins and admins can approve investments."
  })
  @ApiParam({ 
    name: "id", 
    description: "Investment unique identifier",
    example: "507f1f77bcf86cd799439014"
  })
  @ApiResponse({ 
    status: 200, 
    description: "Investment approved successfully",
    type: InvestmentResponseDto
  })
  @ApiResponse({ 
    status: 401, 
    description: "Unauthorized - Invalid or missing JWT token",
    type: UnauthorizedResponseDto
  })
  @ApiResponse({ 
    status: 403, 
    description: "Forbidden - insufficient permissions",
    type: ErrorResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: "Investment not found",
    type: NotFoundResponseDto
  })
  async approveInvestment(@Param('id') id: string) {
    return this.investmentsService.approveInvestment(id);
  }

  @Post(":id/withdraw")
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ 
    summary: "Withdraw investment",
    description: "Withdraw from an investment (if allowed by investment terms). Only the investor can withdraw their own investment."
  })
  @ApiParam({ 
    name: "id", 
    description: "Investment unique identifier",
    example: "507f1f77bcf86cd799439014"
  })
  @ApiResponse({ 
    status: 200, 
    description: "Investment withdrawn successfully",
    type: InvestmentResponseDto
  })
  @ApiResponse({ 
    status: 401, 
    description: "Unauthorized - Invalid or missing JWT token",
    type: UnauthorizedResponseDto
  })
  @ApiResponse({ 
    status: 403, 
    description: "Forbidden - cannot withdraw this investment",
    type: ErrorResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: "Investment not found",
    type: NotFoundResponseDto
  })
  async withdrawInvestment(@Param('id') id: string, @CurrentUser() user: any) {
    return this.investmentsService.withdrawInvestment(id, user.id)
  }
}
