import { ProjectStatus } from "../schemas/investment-project.schema";
import { InvestmentType, InvestmentStatus } from "../schemas/investment.schema";
export declare class InvestmentProjectCreatorDto {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    company?: string;
}
export declare class InvestmentProjectResponseDto {
    _id: string;
    title: string;
    description: string;
    imageUrl?: string;
    minimumInvestment: number;
    targetAmount: number;
    raisedAmount: number;
    expectedROI: number;
    investmentDuration?: string;
    status: ProjectStatus;
    creator: InvestmentProjectCreatorDto;
    location?: string;
    highlights?: string[];
    completionDate?: string;
    investorCount: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
export declare class ProjectStatsResponseDto {
    projectId: string;
    totalRaised: number;
    targetAmount: number;
    fundingPercentage: number;
    investorCount: number;
    averageInvestment: number;
    remainingAmount: number;
    daysRemaining?: number;
}
export declare class InvestorDto {
    _id: string;
    firstName: string;
    lastName: string;
    investmentAmount: number;
    investmentDate: string;
    status: InvestmentStatus;
}
export declare class ProjectInvestmentsResponseDto {
    projectId: string;
    investors: InvestorDto[];
    totalInvestors: number;
    totalInvested: number;
}
export declare class InvestmentResponseDto {
    _id: string;
    investmentType: InvestmentType;
    propertyId?: string;
    projectId?: string;
    investorId: string;
    amount: number;
    shares?: number;
    status: InvestmentStatus;
    expectedReturn?: number;
    expectedReturnDate?: string;
    actualReturn?: number;
    actualReturnDate?: string;
    documents?: string[];
    notes?: string;
    createdAt: string;
    updatedAt: string;
}
export declare class UpdateInvestmentProjectDto {
    title?: string;
    description?: string;
    imageUrl?: string;
    minimumInvestment?: number;
    targetAmount?: number;
    expectedROI?: number;
    investmentDuration?: string;
    location?: string;
    highlights?: string[];
    completionDate?: string;
}
