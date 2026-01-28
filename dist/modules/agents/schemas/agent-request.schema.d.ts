import { Document, Types } from "mongoose";
export declare class AgentRequest extends Document {
    userId: Types.ObjectId;
    reason: string;
    company?: string;
    website?: string;
    bio?: string;
    licenseNumber?: string;
    status: 'pending' | 'approved' | 'rejected';
    adminComments?: string;
    approvedBy?: Types.ObjectId;
    approvalDate?: Date;
}
export declare const AgentRequestSchema: import("mongoose").Schema<AgentRequest, import("mongoose").Model<AgentRequest, any, any, any, Document<unknown, any, AgentRequest, any, {}> & AgentRequest & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AgentRequest, Document<unknown, {}, import("mongoose").FlatRecord<AgentRequest>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<AgentRequest> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
