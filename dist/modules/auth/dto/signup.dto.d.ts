import { UserRole } from "@/common/enums/user-role.enum";
export declare class SignupDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: UserRole;
    phone?: string;
}
