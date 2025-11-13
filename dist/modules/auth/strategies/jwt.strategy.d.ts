import { ConfigService } from "@nestjs/config";
import { UsersService } from "@/modules/users/users.service";
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private usersService;
    constructor(configService: ConfigService, usersService: UsersService);
    validate(payload: any): Promise<{
        id: unknown;
        email: string;
        role: import("../../../common/enums/user-role.enum").UserRole;
    }>;
}
export {};
