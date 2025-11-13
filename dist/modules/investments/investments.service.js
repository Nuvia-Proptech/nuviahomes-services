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
exports.InvestmentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const investment_project_schema_1 = require("./schemas/investment-project.schema");
const investment_schema_1 = require("./schemas/investment.schema");
let InvestmentsService = class InvestmentsService {
    projectModel;
    investmentModel;
    constructor(projectModel, investmentModel) {
        this.projectModel = projectModel;
        this.investmentModel = investmentModel;
    }
    async createProject(createProjectDto, createdBy) {
        const project = new this.projectModel({
            ...createProjectDto,
            createdBy,
            status: investment_project_schema_1.ProjectStatus.PLANNING,
        });
        return project.save();
    }
    async getAllProjects(status, isActive) {
        const filter = {};
        if (status)
            filter.status = status;
        if (isActive !== undefined)
            filter.isActive = isActive;
        return this.projectModel.find(filter).populate("createdBy", "firstName lastName company").sort({ createdAt: -1 });
    }
    async getProjectById(id) {
        const project = await this.projectModel.findById(id).populate("createdBy", "firstName lastName company email");
        if (!project) {
            throw new common_1.NotFoundException("Investment project not found");
        }
        return project;
    }
    async updateProject(id, updateDto, userId) {
        const project = await this.projectModel.findById(id);
        if (!project) {
            throw new common_1.NotFoundException("Investment project not found");
        }
        if (project.createdBy.toString() !== userId) {
            throw new common_1.ForbiddenException("You can only update your own projects");
        }
        Object.assign(project, updateDto);
        return project.save();
    }
    async activateProject(id, userId) {
        const project = await this.projectModel.findById(id);
        if (!project) {
            throw new common_1.NotFoundException("Investment project not found");
        }
        if (project.createdBy.toString() !== userId) {
            throw new common_1.ForbiddenException("You can only activate your own projects");
        }
        project.status = investment_project_schema_1.ProjectStatus.ACTIVE;
        return project.save();
    }
    async getProjectStats(id) {
        const project = await this.getProjectById(id);
        const investments = await this.investmentModel.find({
            projectId: new mongoose_2.Types.ObjectId(id),
            status: investment_schema_1.InvestmentStatus.ACTIVE,
        });
        const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
        const fundingPercentage = (totalInvested / project.targetAmount) * 100;
        return {
            project,
            totalInvested,
            fundingPercentage,
            investorCount: investments.length,
            remainingAmount: Math.max(0, project.targetAmount - totalInvested),
        };
    }
    async createInvestment(createInvestmentDto, investorId) {
        if (createInvestmentDto.investmentType === investment_schema_1.InvestmentType.PROPERTY && !createInvestmentDto.propertyId) {
            throw new common_1.BadRequestException("Property ID is required for property investments");
        }
        if (createInvestmentDto.investmentType === investment_schema_1.InvestmentType.PROJECT && !createInvestmentDto.projectId) {
            throw new common_1.BadRequestException("Project ID is required for project investments");
        }
        if (createInvestmentDto.investmentType === investment_schema_1.InvestmentType.PROJECT) {
            const project = await this.projectModel.findById(createInvestmentDto.projectId);
            if (!project) {
                throw new common_1.NotFoundException("Investment project not found");
            }
            if (createInvestmentDto.amount < project.minimumInvestment) {
                throw new common_1.BadRequestException(`Minimum investment amount is ${project.minimumInvestment}`);
            }
            project.raisedAmount += createInvestmentDto.amount;
            project.investorCount += 1;
            await project.save();
        }
        const investment = new this.investmentModel({
            ...createInvestmentDto,
            investorId,
            status: investment_schema_1.InvestmentStatus.PENDING,
            expectedReturnDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        });
        return investment.save();
    }
    async getInvestmentsByInvestor(investorId) {
        return this.investmentModel
            .find({ investorId })
            .populate("propertyId", "title price address")
            .populate("projectId", "title targetAmount expectedROI")
            .sort({ createdAt: -1 });
    }
    async getInvestmentById(id) {
        const investment = await this.investmentModel
            .findById(id)
            .populate("investorId", "firstName lastName email")
            .populate("propertyId", "title price address")
            .populate("projectId", "title targetAmount expectedROI");
        if (!investment) {
            throw new common_1.NotFoundException("Investment not found");
        }
        return investment;
    }
    async approveInvestment(id) {
        const investment = await this.investmentModel.findByIdAndUpdate(id, { status: investment_schema_1.InvestmentStatus.ACTIVE }, { new: true });
        if (!investment) {
            throw new common_1.NotFoundException("Investment not found");
        }
        return investment;
    }
    async withdrawInvestment(id, userId) {
        const investment = await this.investmentModel.findById(id);
        if (!investment) {
            throw new common_1.NotFoundException("Investment not found");
        }
        if (investment.investorId.toString() !== userId) {
            throw new common_1.ForbiddenException("You can only withdraw your own investments");
        }
        investment.status = investment_schema_1.InvestmentStatus.WITHDRAWN;
        return investment.save();
    }
    async getProjectInvestments(projectId) {
        return this.investmentModel
            .find({ projectId, status: investment_schema_1.InvestmentStatus.ACTIVE })
            .populate("investorId", "firstName lastName email")
            .sort({ createdAt: -1 });
    }
    async getInvestmentOpportunities() {
        return this.projectModel
            .find({
            isActive: true,
            status: investment_project_schema_1.ProjectStatus.ACTIVE,
            $expr: { $lt: ["$raisedAmount", "$targetAmount"] },
        })
            .select("title description minimumInvestment targetAmount raisedAmount expectedROI")
            .limit(10)
            .sort({ createdAt: -1 });
    }
};
exports.InvestmentsService = InvestmentsService;
exports.InvestmentsService = InvestmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(investment_project_schema_1.InvestmentProject.name)),
    __param(1, (0, mongoose_1.InjectModel)(investment_schema_1.Investment.name)),
    __metadata("design:paramtypes", [Function, Function])
], InvestmentsService);
//# sourceMappingURL=investments.service.js.map