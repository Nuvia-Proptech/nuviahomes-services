export declare class CreateInvestmentProjectDto {
    title: string;
    description: string;
    imageUrl?: string;
    minimumInvestment: number;
    targetAmount: number;
    expectedROI: number;
    investmentDuration?: string;
    location?: string;
    highlights?: string[];
}
