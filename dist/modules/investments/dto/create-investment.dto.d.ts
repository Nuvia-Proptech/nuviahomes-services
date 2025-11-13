import { InvestmentType } from "../schemas/investment.schema";
export declare class CreateInvestmentDto {
    investmentType: InvestmentType;
    propertyId?: string;
    projectId?: string;
    amount: number;
    shares?: number;
    notes?: string;
}
