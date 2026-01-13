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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("./dto/login.dto");
const signup_dto_1 = require("./dto/signup.dto");
const forgot_password_dto_1 = require("./dto/forgot-password.dto");
const reset_password_dto_1 = require("./dto/reset-password.dto");
const auth_response_dto_1 = require("./dto/auth-response.dto");
const error_response_dto_1 = require("../../common/dto/error-response.dto");
const success_response_dto_1 = require("../../common/dto/success-response.dto");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async login(request) {
        const loginDto = request.body;
        return this.authService.login(loginDto);
    }
    async signup(signupDto) {
        return this.authService.signup(signupDto);
    }
    async forgotPassword(forgotPasswordDto) {
        return this.authService.forgotPassword(forgotPasswordDto);
    }
    async resetPassword(resetPasswordDto) {
        return this.authService.resetPassword(resetPasswordDto);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({
        summary: "User login",
        description: "Authenticate user with email and password. Returns JWT token and user information."
    }),
    (0, swagger_1.ApiBody)({
        type: login_dto_1.LoginDto,
        examples: {
            user: {
                summary: "Regular User Login",
                description: "Login as a regular user",
                value: {
                    email: "john.doe@example.com",
                    password: "Password123!"
                }
            },
            admin: {
                summary: "Admin Login",
                description: "Login as an admin user",
                value: {
                    email: "admin@nuviahomes.com",
                    password: "Admin123!"
                }
            },
            agent: {
                summary: "Agent Login",
                description: "Login as a real estate agent",
                value: {
                    email: "agent@nuviahomes.com",
                    password: "Agent123!"
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Login successful - Returns JWT token and user information",
        type: auth_response_dto_1.AuthResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Invalid credentials - Email or password is incorrect",
        type: error_response_dto_1.UnauthorizedResponseDto
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('signup'),
    (0, swagger_1.ApiOperation)({
        summary: "User registration",
        description: "Register a new user account. Email must be unique. Returns JWT token and user information."
    }),
    (0, swagger_1.ApiBody)({
        type: signup_dto_1.SignupDto,
        examples: {
            user: {
                summary: "Regular User Registration",
                description: "Register as a regular user",
                value: {
                    firstName: "Jane",
                    lastName: "Smith",
                    email: "jane.smith@example.com",
                    password: "SecurePass123!",
                    phone: "+1987654321",
                    role: "user"
                }
            },
            agent: {
                summary: "Agent Registration",
                description: "Register as a real estate agent",
                value: {
                    firstName: "Mike",
                    lastName: "Johnson",
                    email: "mike.johnson@example.com",
                    password: "AgentPass123!",
                    phone: "+1555123456",
                    role: "agent"
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "User registered successfully - Returns JWT token and user information",
        type: auth_response_dto_1.AuthResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: "User with this email already exists",
        type: error_response_dto_1.ErrorResponseDto
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_dto_1.SignupDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    (0, swagger_1.ApiOperation)({
        summary: "Request password reset",
        description: "Send password reset email to user. Always returns success for security reasons, even if email doesn't exist."
    }),
    (0, swagger_1.ApiBody)({
        type: forgot_password_dto_1.ForgotPasswordDto,
        examples: {
            forgotPassword: {
                summary: "Password Reset Request",
                description: "Request password reset for an email",
                value: {
                    email: "john.doe@example.com"
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Password reset email sent if user exists",
        type: success_response_dto_1.MessageResponseDto
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgot_password_dto_1.ForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    (0, swagger_1.ApiOperation)({
        summary: "Reset password with token",
        description: "Reset user password using the token received via email."
    }),
    (0, swagger_1.ApiBody)({
        type: reset_password_dto_1.ResetPasswordDto,
        examples: {
            resetPassword: {
                summary: "Password Reset",
                description: "Reset password with token and new password",
                value: {
                    token: "abc123def456ghi789",
                    newPassword: "NewSecurePass123!"
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Password reset successful",
        type: success_response_dto_1.MessageResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Invalid or expired reset token",
        type: error_response_dto_1.ErrorResponseDto
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)("Auth"),
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map