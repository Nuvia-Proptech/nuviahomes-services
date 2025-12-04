import { JwtService } from "@nestjs/jwt";
import type { Model } from "mongoose";
import { UsersService } from "@/modules/users/users.service";
import { User } from "@/modules/users/schemas/user.schema";
import type { LoginDto } from "./dto/login.dto";
import type { SignupDto } from "./dto/signup.dto";
import type { ForgotPasswordDto } from "./dto/forgot-password.dto";
import type { ResetPasswordDto } from "./dto/reset-password.dto";
import { UserRole } from "@/common/enums/user-role.enum";
export declare class AuthService {
    private usersService;
    private jwtService;
    private readonly userModel;
    constructor(usersService: UsersService, jwtService: JwtService, userModel: Model<User>);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: unknown;
            email: string;
            firstName: string;
            lastName: string;
            role: UserRole;
        };
    }>;
    signup(signupDto: SignupDto): Promise<{
        access_token: string;
        user: {
            id: unknown;
            email: string;
            firstName: string;
            lastName: string;
            role: UserRole;
        };
    }>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{
        message: string;
        resetToken?: undefined;
    } | {
        message: string;
        resetToken: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
    }>;
}
