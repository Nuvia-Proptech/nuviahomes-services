import { UserRole } from "@/common/enums/user-role.enum";
export declare class AgentRequestResponseDto {
    _id: string;
    userId: string;
    reason: string;
    company?: string;
    website?: string;
    bio?: string;
    licenseNumber?: string;
    status: "pending" | "approved" | "rejected";
    adminComments?: string;
    approvedBy?: string;
    createdAt: string;
    updatedAt: string;
    user?: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
        role: UserRole;
    };
}
