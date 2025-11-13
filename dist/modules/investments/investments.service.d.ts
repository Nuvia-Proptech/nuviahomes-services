import { type Model } from "mongoose";
import { InvestmentProject, ProjectStatus } from "./schemas/investment-project.schema";
import { Investment } from "./schemas/investment.schema";
import type { CreateInvestmentProjectDto } from "./dto/create-investment-project.dto";
import type { CreateInvestmentDto } from "./dto/create-investment.dto";
export declare class InvestmentsService {
    private readonly projectModel;
    private readonly investmentModel;
    constructor(projectModel: Model<InvestmentProject>, investmentModel: Model<Investment>);
    createProject(createProjectDto: CreateInvestmentProjectDto, createdBy: string): Promise<import("mongoose").Document<unknown, {}, InvestmentProject, {}, {}> & InvestmentProject & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getAllProjects(status?: ProjectStatus, isActive?: boolean): Promise<(import("mongoose").Document<unknown, {}, InvestmentProject, {}, {}> & InvestmentProject & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getProjectById(id: string): Promise<import("mongoose").Document<unknown, {}, InvestmentProject, {}, {}> & InvestmentProject & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateProject(id: string, updateDto: any, userId: string): Promise<import("mongoose").Document<unknown, {}, InvestmentProject, {}, {}> & InvestmentProject & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    activateProject(id: string, userId: string): Promise<import("mongoose").Document<unknown, {}, InvestmentProject, {}, {}> & InvestmentProject & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getProjectStats(id: string): Promise<{
        project: import("mongoose").Document<unknown, {}, InvestmentProject, {}, {}> & InvestmentProject & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
        totalInvested: number;
        fundingPercentage: number;
        investorCount: number;
        remainingAmount: number;
    }>;
    createInvestment(createInvestmentDto: CreateInvestmentDto, investorId: string): Promise<import("mongoose").Document<unknown, {}, Investment, {}, {}> & Investment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getInvestmentsByInvestor(investorId: string): Promise<(import("mongoose").Document<unknown, {}, Investment, {}, {}> & Investment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getInvestmentById(id: string): Promise<import("mongoose").Document<unknown, {}, Investment, {}, {}> & Investment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    approveInvestment(id: string): Promise<import("mongoose").Document<unknown, {}, Investment, {}, {}> & Investment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    withdrawInvestment(id: string, userId: string): Promise<import("mongoose").Document<unknown, {}, Investment, {}, {}> & Investment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getProjectInvestments(projectId: string): Promise<(import("mongoose").Document<unknown, {}, Investment, {}, {}> & Investment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getInvestmentOpportunities(): Promise<(import("mongoose").Document<unknown, {}, InvestmentProject, {}, {}> & InvestmentProject & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
}
