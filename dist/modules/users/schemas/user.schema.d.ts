import { Document } from "mongoose";
import { UserRole } from "@/common/enums/user-role.enum";
export declare class User extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole;
    phone?: string;
    profileImage?: string;
    bio?: string;
    company?: string;
    website?: string;
    socialLinks?: {
        facebook?: string;
        twitter?: string;
        linkedin?: string;
        instagram?: string;
    };
    isVerified: boolean;
    isActive: boolean;
    createdBy?: string;
    approvedBy?: string;
    approvalDate?: Date;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User, any, {}> & User & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<User> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
