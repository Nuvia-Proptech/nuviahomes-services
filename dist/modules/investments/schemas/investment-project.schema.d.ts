import { Document, Types } from "mongoose";
export declare enum ProjectStatus {
    PLANNING = "planning",
    ACTIVE = "active",
    COMPLETED = "completed",
    CANCELLED = "cancelled"
}
export declare class InvestmentProject extends Document {
    title: string;
    description: string;
    imageUrl?: string;
    minimumInvestment: number;
    targetAmount: number;
    raisedAmount: number;
    expectedROI: number;
    investmentDuration?: string;
    status: ProjectStatus;
    createdBy: Types.ObjectId;
    location?: string;
    highlights?: string[];
    completionDate?: Date;
    investorCount: number;
    isActive: boolean;
}
export declare const InvestmentProjectSchema: import("mongoose").Schema<InvestmentProject, import("mongoose").Model<InvestmentProject, any, any, any, Document<unknown, any, InvestmentProject, any, {}> & InvestmentProject & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, InvestmentProject, Document<unknown, {}, import("mongoose").FlatRecord<InvestmentProject>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<InvestmentProject> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
