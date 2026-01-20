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
exports.RespondToContactDto = exports.ContactSubmissionStatsDto = exports.ContactSubmissionResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ContactSubmissionResponseDto {
    _id;
    name;
    email;
    phone;
    subject;
    message;
    userId;
    isRead;
    response;
    respondedAt;
    createdAt;
    updatedAt;
}
exports.ContactSubmissionResponseDto = ContactSubmissionResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "507f1f77bcf86cd799439015",
        description: "Submission's unique identifier"
    }),
    __metadata("design:type", String)
], ContactSubmissionResponseDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "John Doe",
        description: "Contact person's name"
    }),
    __metadata("design:type", String)
], ContactSubmissionResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "john.doe@example.com",
        description: "Contact person's email address"
    }),
    __metadata("design:type", String)
], ContactSubmissionResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "+1234567890",
        description: "Contact person's phone number",
        required: false
    }),
    __metadata("design:type", String)
], ContactSubmissionResponseDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Inquiry about Property Investment",
        description: "Subject of the contact message"
    }),
    __metadata("design:type", String)
], ContactSubmissionResponseDto.prototype, "subject", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Hello, I am interested in learning more about your investment opportunities. Could you please provide more information about the downtown apartment complex project?",
        description: "Contact message content"
    }),
    __metadata("design:type", String)
], ContactSubmissionResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "507f1f77bcf86cd799439011",
        description: "User ID if submitted by registered user",
        required: false
    }),
    __metadata("design:type", String)
], ContactSubmissionResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: false,
        description: "Whether the submission has been read by admin"
    }),
    __metadata("design:type", Boolean)
], ContactSubmissionResponseDto.prototype, "isRead", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Thank you for your inquiry. We will contact you within 24 hours with detailed information about our investment opportunities.",
        description: "Admin response to the contact submission",
        required: false
    }),
    __metadata("design:type", String)
], ContactSubmissionResponseDto.prototype, "response", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "2024-01-20T16:30:00.000Z",
        description: "When admin responded to the submission",
        required: false
    }),
    __metadata("design:type", String)
], ContactSubmissionResponseDto.prototype, "respondedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "2024-01-18T14:20:00.000Z",
        description: "Submission creation timestamp"
    }),
    __metadata("design:type", String)
], ContactSubmissionResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "2024-01-20T16:30:00.000Z",
        description: "Last update timestamp"
    }),
    __metadata("design:type", String)
], ContactSubmissionResponseDto.prototype, "updatedAt", void 0);
class ContactSubmissionStatsDto {
    totalSubmissions;
    unreadSubmissions;
    readSubmissions;
    respondedSubmissions;
    todaySubmissions;
    weekSubmissions;
}
exports.ContactSubmissionStatsDto = ContactSubmissionStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 156,
        description: "Total number of submissions"
    }),
    __metadata("design:type", Number)
], ContactSubmissionStatsDto.prototype, "totalSubmissions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 23,
        description: "Number of unread submissions"
    }),
    __metadata("design:type", Number)
], ContactSubmissionStatsDto.prototype, "unreadSubmissions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 133,
        description: "Number of read submissions"
    }),
    __metadata("design:type", Number)
], ContactSubmissionStatsDto.prototype, "readSubmissions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 89,
        description: "Number of submissions with responses"
    }),
    __metadata("design:type", Number)
], ContactSubmissionStatsDto.prototype, "respondedSubmissions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 12,
        description: "Number of submissions today"
    }),
    __metadata("design:type", Number)
], ContactSubmissionStatsDto.prototype, "todaySubmissions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 45,
        description: "Number of submissions this week"
    }),
    __metadata("design:type", Number)
], ContactSubmissionStatsDto.prototype, "weekSubmissions", void 0);
class RespondToContactDto {
    response;
}
exports.RespondToContactDto = RespondToContactDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Thank you for your inquiry about our investment opportunities. We have reviewed your request and would like to schedule a call to discuss the details. Please let us know your availability for next week.",
        description: "Response message to the contact submission"
    }),
    __metadata("design:type", String)
], RespondToContactDto.prototype, "response", void 0);
//# sourceMappingURL=contact-response.dto.js.map