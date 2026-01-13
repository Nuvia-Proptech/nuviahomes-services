import { UserRole } from "@/common/enums/user-role.enum";
export declare class SocialLinksDto {
    linkedin?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
}
export declare class AgentResponseDto {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    phone?: string;
    profileImage?: string;
    bio?: string;
    company?: string;
    website?: string;
    socialLinks?: SocialLinksDto;
    isVerified: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
export declare class AgentUpdateDto {
    firstName?: string;
    lastName?: string;
    phone?: string;
    bio?: string;
    company?: string;
    website?: string;
    socialLinks?: SocialLinksDto;
}
