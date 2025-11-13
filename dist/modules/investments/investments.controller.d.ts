import { InvestmentsService } from "./investments.service";
import type { CreateInvestmentProjectDto } from "./dto/create-investment-project.dto";
import type { CreateInvestmentDto } from "./dto/create-investment.dto";
export declare class InvestmentsController {
    private readonly investmentsService;
    constructor(investmentsService: InvestmentsService);
    createProject(createProjectDto: CreateInvestmentProjectDto, user: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/investment-project.schema").InvestmentProject, {}, {}> & import("./schemas/investment-project.schema").InvestmentProject & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getAllProjects(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/investment-project.schema").InvestmentProject, {}, {}> & import("./schemas/investment-project.schema").InvestmentProject & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getOpportunities(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/investment-project.schema").InvestmentProject, {}, {}> & import("./schemas/investment-project.schema").InvestmentProject & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getProjectById(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/investment-project.schema").InvestmentProject, {}, {}> & import("./schemas/investment-project.schema").InvestmentProject & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getProjectStats(id: string): Promise<{
        project: import("mongoose").Document<unknown, {}, import("./schemas/investment-project.schema").InvestmentProject, {}, {}> & import("./schemas/investment-project.schema").InvestmentProject & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
        totalInvested: number;
        fundingPercentage: number;
        investorCount: number;
        remainingAmount: number;
    }>;
    updateProject(id: string, updateDto: any, user: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/investment-project.schema").InvestmentProject, {}, {}> & import("./schemas/investment-project.schema").InvestmentProject & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    activateProject(id: string, user: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/investment-project.schema").InvestmentProject, {}, {}> & import("./schemas/investment-project.schema").InvestmentProject & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getProjectInvestments(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/investment.schema").Investment, {}, {}> & import("./schemas/investment.schema").Investment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    createInvestment(createInvestmentDto: CreateInvestmentDto, user: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/investment.schema").Investment, {}, {}> & import("./schemas/investment.schema").Investment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getMyInvestments(user: any): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/investment.schema").Investment, {}, {}> & import("./schemas/investment.schema").Investment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getInvestmentById(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/investment.schema").Investment, {}, {}> & import("./schemas/investment.schema").Investment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    approveInvestment(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/investment.schema").Investment, {}, {}> & import("./schemas/investment.schema").Investment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    withdrawInvestment(id: string, user: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/investment.schema").Investment, {}, {}> & import("./schemas/investment.schema").Investment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
