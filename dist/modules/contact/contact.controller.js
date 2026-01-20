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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const contact_service_1 = require("./contact.service");
const submit_contact_dto_1 = require("./dto/submit-contact.dto");
const contact_response_dto_1 = require("./dto/contact-response.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const user_role_enum_1 = require("../../common/enums/user-role.enum");
const error_response_dto_1 = require("../../common/dto/error-response.dto");
const success_response_dto_1 = require("../../common/dto/success-response.dto");
let ContactController = class ContactController {
    contactService;
    constructor(contactService) {
        this.contactService = contactService;
    }
    async submitContact(submitContactDto, currentUser) {
        return this.contactService.submitContact(submitContactDto, currentUser?.id);
    }
    async getAllSubmissions() {
        return this.contactService.getAllSubmissions();
    }
    async getSubmissionById(id) {
        return this.contactService.getSubmissionById(id);
    }
    async markAsRead(id) {
        return this.contactService.markAsRead(id);
    }
    async respondToContact(id, body) {
        return this.contactService.respondToContact(id, body.response);
    }
    async deleteSubmission(id) {
        return this.contactService.deleteSubmission(id);
    }
};
exports.ContactController = ContactController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: "Submit a contact form",
        description: "Submit a contact form inquiry. Can be submitted by both authenticated and anonymous users."
    }),
    (0, swagger_1.ApiBody)({
        type: submit_contact_dto_1.SubmitContactDto,
        examples: {
            investmentInquiry: {
                summary: "Investment Inquiry",
                description: "Example of an investment-related contact form",
                value: {
                    name: "John Doe",
                    email: "john.doe@example.com",
                    phone: "+1234567890",
                    subject: "Inquiry about Property Investment",
                    message: "Hello, I am interested in learning more about your investment opportunities. Could you please provide more information about the downtown apartment complex project? I would also like to know about the minimum investment requirements and expected returns."
                }
            },
            propertyInquiry: {
                summary: "Property Inquiry",
                description: "Example of a property-related contact form",
                value: {
                    name: "Jane Smith",
                    email: "jane.smith@example.com",
                    phone: "+1987654321",
                    subject: "Property Listing Question",
                    message: "I saw your listing for the 3-bedroom house on Main Street. Is it still available? I would like to schedule a viewing and get more details about the property."
                }
            },
            generalInquiry: {
                summary: "General Inquiry",
                description: "Example of a general contact form",
                value: {
                    name: "Mike Johnson",
                    email: "mike.johnson@example.com",
                    phone: "+1555123456",
                    subject: "General Information Request",
                    message: "I would like to learn more about your services and how you can help me with real estate investments. Please contact me to discuss my options."
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Contact form submitted successfully",
        type: contact_response_dto_1.ContactSubmissionResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Bad request - Invalid form data",
        type: error_response_dto_1.ErrorResponseDto
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [submit_contact_dto_1.SubmitContactDto, Object]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "submitContact", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPER_ADMIN, user_role_enum_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: "Get all contact submissions (Admin only)",
        description: "Retrieve all contact form submissions. Only super admins and admins can access this endpoint."
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Returns all contact submissions",
        type: [contact_response_dto_1.ContactSubmissionResponseDto]
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing JWT token",
        type: error_response_dto_1.UnauthorizedResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: "Forbidden - insufficient permissions",
        type: error_response_dto_1.ErrorResponseDto
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "getAllSubmissions", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPER_ADMIN, user_role_enum_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: "Get contact submission by ID (Admin only)",
        description: "Retrieve a specific contact submission by its ID. Only super admins and admins can access this endpoint."
    }),
    (0, swagger_1.ApiParam)({
        name: "id",
        description: "Contact submission unique identifier",
        example: "507f1f77bcf86cd799439015"
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Returns contact submission details",
        type: contact_response_dto_1.ContactSubmissionResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing JWT token",
        type: error_response_dto_1.UnauthorizedResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: "Forbidden - insufficient permissions",
        type: error_response_dto_1.ErrorResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Submission not found",
        type: error_response_dto_1.NotFoundResponseDto
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "getSubmissionById", null);
__decorate([
    (0, common_1.Patch)(':id/read'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPER_ADMIN, user_role_enum_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: "Mark submission as read (Admin only)",
        description: "Mark a contact submission as read. Only super admins and admins can perform this action."
    }),
    (0, swagger_1.ApiParam)({
        name: "id",
        description: "Contact submission unique identifier",
        example: "507f1f77bcf86cd799439015"
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Marked as read successfully",
        type: contact_response_dto_1.ContactSubmissionResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing JWT token",
        type: error_response_dto_1.UnauthorizedResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: "Forbidden - insufficient permissions",
        type: error_response_dto_1.ErrorResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Submission not found",
        type: error_response_dto_1.NotFoundResponseDto
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "markAsRead", null);
__decorate([
    (0, common_1.Patch)(":id/respond"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPER_ADMIN, user_role_enum_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: "Respond to contact submission (Admin only)",
        description: "Send a response to a contact submission. Only super admins and admins can respond to submissions."
    }),
    (0, swagger_1.ApiParam)({
        name: "id",
        description: "Contact submission unique identifier",
        example: "507f1f77bcf86cd799439015"
    }),
    (0, swagger_1.ApiBody)({
        type: contact_response_dto_1.RespondToContactDto,
        examples: {
            investmentResponse: {
                summary: "Investment Inquiry Response",
                description: "Response to an investment-related inquiry",
                value: {
                    response: "Thank you for your inquiry about our investment opportunities. We have reviewed your request and would like to schedule a call to discuss the downtown apartment complex project in detail. Our minimum investment is $10,000 with an expected ROI of 15.5% over 18 months. Please let us know your availability for a call this week."
                }
            },
            propertyResponse: {
                summary: "Property Inquiry Response",
                description: "Response to a property-related inquiry",
                value: {
                    response: "Thank you for your interest in the 3-bedroom house on Main Street. The property is still available and we would be happy to schedule a viewing. The asking price is $450,000 and it features modern amenities with a 2-car garage. Please let us know your preferred viewing times."
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Response sent successfully",
        type: contact_response_dto_1.ContactSubmissionResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing JWT token",
        type: error_response_dto_1.UnauthorizedResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: "Forbidden - insufficient permissions",
        type: error_response_dto_1.ErrorResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Submission not found",
        type: error_response_dto_1.NotFoundResponseDto
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, contact_response_dto_1.RespondToContactDto]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "respondToContact", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPER_ADMIN, user_role_enum_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: "Delete contact submission (Admin only)",
        description: "Delete a contact submission permanently. Only super admins and admins can delete submissions."
    }),
    (0, swagger_1.ApiParam)({
        name: "id",
        description: "Contact submission unique identifier",
        example: "507f1f77bcf86cd799439015"
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Submission deleted successfully",
        type: success_response_dto_1.MessageResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing JWT token",
        type: error_response_dto_1.UnauthorizedResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: "Forbidden - insufficient permissions",
        type: error_response_dto_1.ErrorResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Submission not found",
        type: error_response_dto_1.NotFoundResponseDto
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "deleteSubmission", null);
exports.ContactController = ContactController = __decorate([
    (0, swagger_1.ApiTags)("Contact"),
    (0, common_1.Controller)("contact"),
    __metadata("design:paramtypes", [contact_service_1.ContactService])
], ContactController);
//# sourceMappingURL=contact.controller.js.map