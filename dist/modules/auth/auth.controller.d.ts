import { AuthService } from "./auth.service";
import { SignupDto } from "./dto/signup.dto";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { AuthResponseDto } from "./dto/auth-response.dto";
import type { Request } from "express";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(request: Request): Promise<AuthResponseDto>;
    signup(signupDto: SignupDto): Promise<AuthResponseDto>;
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
