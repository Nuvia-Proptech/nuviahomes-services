import { UsersService } from "./users.service";
import type { UpdateUserDto } from "./dto/update-user.dto";
import { ChangeRoleDto } from "./dto/change-role.dto";
import { UserRole } from "@/common/enums/user-role.enum";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(role?: UserRole, isActive?: boolean): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User, {}, {}> & import("./schemas/user.schema").User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User, {}, {}> & import("./schemas/user.schema").User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(id: string, updateUserDto: UpdateUserDto, currentUser: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User, {}, {}> & import("./schemas/user.schema").User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    approveUser(id: string, currentUser: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User, {}, {}> & import("./schemas/user.schema").User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    rejectUser(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User, {}, {}> & import("./schemas/user.schema").User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    requestRoleChange(changeRoleDto: ChangeRoleDto, currentUser: any): Promise<{
        message: string;
        user: (import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User, {}, {}> & import("./schemas/user.schema").User & Required<{
            _id: unknown;
        }> & {
            __v: number;
        }) | null;
    }>;
    changeUserRole(id: string, newRole: UserRole, currentUser: any): Promise<{
        message: string;
        user: (import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User, {}, {}> & import("./schemas/user.schema").User & Required<{
            _id: unknown;
        }> & {
            __v: number;
        }) | null;
    }>;
}
