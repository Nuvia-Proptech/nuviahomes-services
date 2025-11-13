import { JwtService } from "@nestjs/jwt";
import { UsersService } from "@/modules/users/users.service";
import type { LoginDto } from "./dto/login.dto";
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: unknown;
            email: string;
            firstName: string;
            lastName: string;
            role: import("../../common/enums/user-role.enum").UserRole;
        };
    }>;
}
