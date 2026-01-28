import type { Model } from "mongoose";
import { User } from "./schemas/user.schema";
import type { CreateUserDto } from "./dto/create-user.dto";
import type { UpdateUserDto } from "./dto/update-user.dto";
import { ChangeRoleDto } from "./dto/change-role.dto";
import { UserRole } from "@/common/enums/user-role.enum";
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    create(createUserDto: CreateUserDto, createdBy?: string): Promise<import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAll(role?: UserRole, isActive?: boolean): Promise<(import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findByEmail(email: string): Promise<(import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    changePassword(id: string, oldPassword: string, newPassword: string): Promise<import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    approveUser(userId: string, approvedBy: string): Promise<import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    rejectUser(userId: string): Promise<import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    requestRoleChange(userId: string, changeRoleDto: ChangeRoleDto): Promise<{
        message: string;
        user: (import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
            _id: unknown;
        }> & {
            __v: number;
        }) | null;
    }>;
    changeUserRole(userId: string, newRole: UserRole, adminId: string): Promise<{
        message: string;
        user: (import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
            _id: unknown;
        }> & {
            __v: number;
        }) | null;
    }>;
}
