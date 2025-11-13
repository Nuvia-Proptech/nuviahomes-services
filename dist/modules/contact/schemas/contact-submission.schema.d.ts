import { Document, Types } from "mongoose";
export declare class ContactSubmission extends Document {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    userId?: Types.ObjectId;
    isRead: boolean;
    response?: string;
    respondedAt?: Date;
}
export declare const ContactSubmissionSchema: import("mongoose").Schema<ContactSubmission, import("mongoose").Model<ContactSubmission, any, any, any, Document<unknown, any, ContactSubmission, any, {}> & ContactSubmission & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ContactSubmission, Document<unknown, {}, import("mongoose").FlatRecord<ContactSubmission>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<ContactSubmission> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
