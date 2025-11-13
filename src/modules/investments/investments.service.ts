import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { type Model, Types } from "mongoose"
import { InvestmentProject, ProjectStatus } from "./schemas/investment-project.schema"
import { Investment, InvestmentStatus, InvestmentType } from "./schemas/investment.schema"
import type { CreateInvestmentProjectDto } from "./dto/create-investment-project.dto"
import type { CreateInvestmentDto } from "./dto/create-investment.dto"

@Injectable()
export class InvestmentsService {
  constructor(
    @InjectModel(InvestmentProject.name) private readonly projectModel: Model<InvestmentProject>,
    @InjectModel(Investment.name) private readonly investmentModel: Model<Investment>,
  ) {}

  // Investment Projects
  async createProject(createProjectDto: CreateInvestmentProjectDto, createdBy: string) {
    const project = new this.projectModel({
      ...createProjectDto,
      createdBy,
      status: ProjectStatus.PLANNING,
    })
    return project.save()
  }

  async getAllProjects(status?: ProjectStatus, isActive?: boolean) {
    const filter: any = {}
    if (status) filter.status = status
    if (isActive !== undefined) filter.isActive = isActive

    return this.projectModel.find(filter).populate("createdBy", "firstName lastName company").sort({ createdAt: -1 })
  }

  async getProjectById(id: string) {
    const project = await this.projectModel.findById(id).populate("createdBy", "firstName lastName company email")

    if (!project) {
      throw new NotFoundException("Investment project not found")
    }

    return project
  }

  async updateProject(id: string, updateDto: any, userId: string) {
    const project = await this.projectModel.findById(id)
    if (!project) {
      throw new NotFoundException("Investment project not found")
    }

    if (project.createdBy.toString() !== userId) {
      throw new ForbiddenException("You can only update your own projects")
    }

    Object.assign(project, updateDto)
    return project.save()
  }

  async activateProject(id: string, userId: string) {
    const project = await this.projectModel.findById(id)
    if (!project) {
      throw new NotFoundException("Investment project not found")
    }

    if (project.createdBy.toString() !== userId) {
      throw new ForbiddenException("You can only activate your own projects")
    }

    project.status = ProjectStatus.ACTIVE
    return project.save()
  }

  async getProjectStats(id: string) {
    const project = await this.getProjectById(id)
    const investments = await this.investmentModel.find({
      projectId: new Types.ObjectId(id),
      status: InvestmentStatus.ACTIVE,
    })

    const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0)
    const fundingPercentage = (totalInvested / project.targetAmount) * 100

    return {
      project,
      totalInvested,
      fundingPercentage,
      investorCount: investments.length,
      remainingAmount: Math.max(0, project.targetAmount - totalInvested),
    }
  }

  // Investments
  async createInvestment(createInvestmentDto: CreateInvestmentDto, investorId: string) {
    // Validate investment type and ID
    if (createInvestmentDto.investmentType === InvestmentType.PROPERTY && !createInvestmentDto.propertyId) {
      throw new BadRequestException("Property ID is required for property investments")
    }

    if (createInvestmentDto.investmentType === InvestmentType.PROJECT && !createInvestmentDto.projectId) {
      throw new BadRequestException("Project ID is required for project investments")
    }

    // For project investments, validate minimum investment
    if (createInvestmentDto.investmentType === InvestmentType.PROJECT) {
      const project = await this.projectModel.findById(createInvestmentDto.projectId)
      if (!project) {
        throw new NotFoundException("Investment project not found")
      }

      if (createInvestmentDto.amount < project.minimumInvestment) {
        throw new BadRequestException(`Minimum investment amount is ${project.minimumInvestment}`)
      }

      // Update project raised amount
      project.raisedAmount += createInvestmentDto.amount
      project.investorCount += 1
      await project.save()
    }

    const investment = new this.investmentModel({
      ...createInvestmentDto,
      investorId,
      status: InvestmentStatus.PENDING,
      expectedReturnDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
    })

    return investment.save()
  }

  async getInvestmentsByInvestor(investorId: string) {
    return this.investmentModel
      .find({ investorId })
      .populate("propertyId", "title price address")
      .populate("projectId", "title targetAmount expectedROI")
      .sort({ createdAt: -1 })
  }

  async getInvestmentById(id: string) {
    const investment = await this.investmentModel
      .findById(id)
      .populate("investorId", "firstName lastName email")
      .populate("propertyId", "title price address")
      .populate("projectId", "title targetAmount expectedROI")

    if (!investment) {
      throw new NotFoundException("Investment not found")
    }

    return investment
  }

  async approveInvestment(id: string) {
    const investment = await this.investmentModel.findByIdAndUpdate(
      id,
      { status: InvestmentStatus.ACTIVE },
      { new: true },
    )

    if (!investment) {
      throw new NotFoundException("Investment not found")
    }

    return investment
  }

  async withdrawInvestment(id: string, userId: string) {
    const investment = await this.investmentModel.findById(id)
    if (!investment) {
      throw new NotFoundException("Investment not found")
    }

    if (investment.investorId.toString() !== userId) {
      throw new ForbiddenException("You can only withdraw your own investments")
    }

    investment.status = InvestmentStatus.WITHDRAWN
    return investment.save()
  }

  async getProjectInvestments(projectId: string) {
    return this.investmentModel
      .find({ projectId, status: InvestmentStatus.ACTIVE })
      .populate("investorId", "firstName lastName email")
      .sort({ createdAt: -1 })
  }

  async getInvestmentOpportunities() {
    return this.projectModel
      .find({
        isActive: true,
        status: ProjectStatus.ACTIVE,
        $expr: { $lt: ["$raisedAmount", "$targetAmount"] },
      })
      .select("title description minimumInvestment targetAmount raisedAmount expectedROI")
      .limit(10)
      .sort({ createdAt: -1 })
  }
}
