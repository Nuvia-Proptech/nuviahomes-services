import { UserRole } from "@/common/enums/user-role.enum";
export declare class ChangeRoleDto {
    newRole: UserRole.AGENT | UserRole.PROPERTY_OWNER;
    reason?: string;
}
