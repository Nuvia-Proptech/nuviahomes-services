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
exports.AgentUpdateDto = exports.AgentResponseDto = exports.SocialLinksDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_role_enum_1 = require("../../../common/enums/user-role.enum");
class SocialLinksDto {
    linkedin;
    facebook;
    twitter;
    instagram;
}
exports.SocialLinksDto = SocialLinksDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "https://linkedin.com/in/johnagent",
        description: "LinkedIn profile URL",
        required: false
    }),
    __metadata("design:type", String)
], SocialLinksDto.prototype, "linkedin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "https://facebook.com/johnagent",
        description: "Facebook profile URL",
        required: false
    }),
    __metadata("design:type", String)
], SocialLinksDto.prototype, "facebook", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "https://twitter.com/johnagent",
        description: "Twitter profile URL",
        required: false
    }),
    __metadata("design:type", String)
], SocialLinksDto.prototype, "twitter", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "https://instagram.com/johnagent",
        description: "Instagram profile URL",
        required: false
    }),
    __metadata("design:type", String)
], SocialLinksDto.prototype, "instagram", void 0);
class AgentResponseDto {
    _id;
    firstName;
    lastName;
    email;
    role;
    phone;
    profileImage;
    bio;
    company;
    website;
    socialLinks;
    isVerified;
    isActive;
    createdAt;
    updatedAt;
}
exports.AgentResponseDto = AgentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "507f1f77bcf86cd799439013",
        description: "Agent's unique identifier"
    }),
    __metadata("design:type", String)
], AgentResponseDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "John",
        description: "Agent's first name"
    }),
    __metadata("design:type", String)
], AgentResponseDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Agent",
        description: "Agent's last name"
    }),
    __metadata("design:type", String)
], AgentResponseDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "john.agent@nuviahomes.com",
        description: "Agent's email address"
    }),
    __metadata("design:type", String)
], AgentResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: user_role_enum_1.UserRole.AGENT,
        enum: user_role_enum_1.UserRole,
        description: "User role (should be 'agent')"
    }),
    __metadata("design:type", String)
], AgentResponseDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "+1234567892",
        description: "Agent's phone number",
        required: false
    }),
    __metadata("design:type", String)
], AgentResponseDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "https://example.com/john-agent.jpg",
        description: "URL to agent's profile image",
        required: false
    }),
    __metadata("design:type", String)
], AgentResponseDto.prototype, "profileImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Experienced real estate agent with 8+ years in residential properties. Specializing in first-time home buyers and investment properties.",
        description: "Agent's biography",
        required: false
    }),
    __metadata("design:type", String)
], AgentResponseDto.prototype, "bio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Nuvia Homes",
        description: "Agent's company",
        required: false
    }),
    __metadata("design:type", String)
], AgentResponseDto.prototype, "company", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "https://johnagent.com",
        description: "Agent's personal website",
        required: false
    }),
    __metadata("design:type", String)
], AgentResponseDto.prototype, "website", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: SocialLinksDto,
        description: "Agent's social media links",
        required: false
    }),
    __metadata("design:type", SocialLinksDto)
], AgentResponseDto.prototype, "socialLinks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: "Whether the agent is verified"
    }),
    __metadata("design:type", Boolean)
], AgentResponseDto.prototype, "isVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: "Whether the agent account is active"
    }),
    __metadata("design:type", Boolean)
], AgentResponseDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "2024-01-10T09:00:00.000Z",
        description: "Account creation timestamp"
    }),
    __metadata("design:type", String)
], AgentResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "2024-01-15T14:30:00.000Z",
        description: "Last update timestamp"
    }),
    __metadata("design:type", String)
], AgentResponseDto.prototype, "updatedAt", void 0);
class AgentUpdateDto {
    firstName;
    lastName;
    phone;
    bio;
    company;
    website;
    socialLinks;
}
exports.AgentUpdateDto = AgentUpdateDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "John",
        description: "Agent's first name",
        required: false
    }),
    __metadata("design:type", String)
], AgentUpdateDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Agent",
        description: "Agent's last name",
        required: false
    }),
    __metadata("design:type", String)
], AgentUpdateDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "+1234567892",
        description: "Agent's phone number",
        required: false
    }),
    __metadata("design:type", String)
], AgentUpdateDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Updated bio: Experienced real estate agent specializing in luxury properties",
        description: "Agent's biography",
        required: false
    }),
    __metadata("design:type", String)
], AgentUpdateDto.prototype, "bio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Nuvia Homes Premium",
        description: "Agent's company",
        required: false
    }),
    __metadata("design:type", String)
], AgentUpdateDto.prototype, "company", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "https://johnagent.com",
        description: "Agent's personal website",
        required: false
    }),
    __metadata("design:type", String)
], AgentUpdateDto.prototype, "website", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: SocialLinksDto,
        description: "Agent's social media links",
        required: false
    }),
    __metadata("design:type", SocialLinksDto)
], AgentUpdateDto.prototype, "socialLinks", void 0);
//# sourceMappingURL=agent-response.dto.js.map