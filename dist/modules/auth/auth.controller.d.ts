import { AuthService } from "./auth.service";
import type { AuthResponseDto } from "./dto/auth-response.dto";
import type { Request } from "express";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(request: Request): Promise<AuthResponseDto>;
}
