import { UserRole } from "@/common/enums/user-role.enum";
declare class UserResponseDto {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
}
export declare class AuthResponseDto {
    access_token: string;
    user: UserResponseDto;
}
export {};
