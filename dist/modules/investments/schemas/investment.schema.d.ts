import { Document, Types } from "mongoose";
export declare enum InvestmentType {
    PROPERTY = "property",
    PROJECT = "project"
}
export declare enum InvestmentStatus {
    PENDING = "pending",
    ACTIVE = "active",
    COMPLETED = "completed",
    WITHDRAWN = "withdrawn"
}
export declare class Investment extends Document {
    investmentType: InvestmentType;
    propertyId?: Types.ObjectId;
    projectId?: Types.ObjectId;
    investorId: Types.ObjectId;
    amount: number;
    shares?: number;
    status: InvestmentStatus;
    expectedReturn?: number;
    expectedReturnDate?: Date;
    actualReturn?: number;
    actualReturnDate?: Date;
    documents?: string[];
    notes?: string;
}
export declare const InvestmentSchema: import("mongoose").Schema<Investment, import("mongoose").Model<Investment, any, any, any, Document<unknown, any, Investment, any, {}> & Investment & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Investment, Document<unknown, {}, import("mongoose").FlatRecord<Investment>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Investment> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
