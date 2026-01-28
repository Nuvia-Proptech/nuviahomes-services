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
exports.AgentRequestResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class AgentRequestResponseDto {
    _id;
    userId;
    reason;
    company;
    website;
    bio;
    licenseNumber;
    status;
    adminComments;
    approvedBy;
    createdAt;
    updatedAt;
    user;
}
exports.AgentRequestResponseDto = AgentRequestResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "507f1f77bcf86cd799439011",
        description: "Request ID"
    }),
    __metadata("design:type", String)
], AgentRequestResponseDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "507f1f77bcf86cd799439012",
        description: "User ID who made the request"
    }),
    __metadata("design:type", String)
], AgentRequestResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "I have 5+ years of experience in real estate and want to become an agent on your platform.",
        description: "Reason for requesting agent status"
    }),
    __metadata("design:type", String)
], AgentRequestResponseDto.prototype, "reason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Real Estate Pro Inc.",
        description: "Current company or agency",
        required: false
    }),
    __metadata("design:type", String)
], AgentRequestResponseDto.prototype, "company", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "https://myrealestate.com",
        description: "Professional website URL",
        required: false
    }),
    __metadata("design:type", String)
], AgentRequestResponseDto.prototype, "website", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Licensed real estate agent with specialization in residential properties",
        description: "Professional bio",
        required: false
    }),
    __metadata("design:type", String)
], AgentRequestResponseDto.prototype, "bio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "REL123456789",
        description: "Real estate license number",
        required: false
    }),
    __metadata("design:type", String)
], AgentRequestResponseDto.prototype, "licenseNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "pending",
        enum: ["pending", "approved", "rejected"],
        description: "Status of the agent request"
    }),
    __metadata("design:type", String)
], AgentRequestResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Your application has been approved. Welcome to our agent network!",
        description: "Admin comments or feedback",
        required: false
    }),
    __metadata("design:type", String)
], AgentRequestResponseDto.prototype, "adminComments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "507f1f77bcf86cd799439013",
        description: "Admin who processed the request",
        required: false
    }),
    __metadata("design:type", String)
], AgentRequestResponseDto.prototype, "approvedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "2024-01-15T10:30:00.000Z",
        description: "Request creation timestamp"
    }),
    __metadata("design:type", String)
], AgentRequestResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "2024-01-15T14:30:00.000Z",
        description: "Last update timestamp"
    }),
    __metadata("design:type", String)
], AgentRequestResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "User information",
        required: false
    }),
    __metadata("design:type", Object)
], AgentRequestResponseDto.prototype, "user", void 0);
//# sourceMappingURL=agent-request-response.dto.js.map