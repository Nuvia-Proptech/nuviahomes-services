"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeRoleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const user_role_enum_1 = require("../../../common/enums/user-role.enum");
class ChangeRoleDto {
    newRole;
    reason;
}
exports.ChangeRoleDto = ChangeRoleDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: [user_role_enum_1.UserRole.AGENT, user_role_enum_1.UserRole.PROPERTY_OWNER],
        example: user_role_enum_1.UserRole.AGENT,
        description: "New role for the user (can only be AGENT or PROPERTY_OWNER)"
    }),
    (0, class_validator_1.IsEnum)([user_role_enum_1.UserRole.AGENT, user_role_enum_1.UserRole.PROPERTY_OWNER]),
    __metadata("design:type", String)
], ChangeRoleDto.prototype, "newRole", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "I have 5 years of real estate experience and want to become an agent",
        required: false,
        description: "Optional reason for the role change request"
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChangeRoleDto.prototype, "reason", void 0);
//# sourceMappingURL=change-role.dto.js.map