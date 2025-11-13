import { Document, Types } from "mongoose";
export declare class AgentProfile extends Document {
    userId: Types.ObjectId;
    specialization?: string;
    yearsOfExperience?: number;
    licenseNumber?: string;
    licenseExpiry?: Date;
    certifications?: string[];
    awards?: {
        title: string;
        year: number;
    }[];
    totalPropertiesListed: number;
    totalPropertySales: number;
    averageRating: number;
    reviewCount: number;
    bankAccount?: string;
    commission?: number;
}
export declare const AgentProfileSchema: import("mongoose").Schema<AgentProfile, import("mongoose").Model<AgentProfile, any, any, any, Document<unknown, any, AgentProfile, any, {}> & AgentProfile & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AgentProfile, Document<unknown, {}, import("mongoose").FlatRecord<AgentProfile>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<AgentProfile> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
