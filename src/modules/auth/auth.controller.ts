import { Controller, Post, Req, Body } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger"
import { AuthService } from "./auth.service"
import { LoginDto } from "./dto/login.dto"
import { SignupDto } from "./dto/signup.dto"
import { ForgotPasswordDto } from "./dto/forgot-password.dto"
import { ResetPasswordDto } from "./dto/reset-password.dto"
import { AuthResponseDto } from "./dto/auth-response.dto"
import { ErrorResponseDto, UnauthorizedResponseDto } from "@/common/dto/error-response.dto"
import { MessageResponseDto } from "@/common/dto/success-response.dto"
import type { Request } from "express"

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ 
    summary: "User login",
    description: "Authenticate user with email and password. Returns JWT token and user information."
  })
  @ApiBody({ 
    type: LoginDto,
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
  })
  @ApiResponse({ 
    status: 200, 
    description: "Login successful - Returns JWT token and user information", 
    type: AuthResponseDto
  })
  @ApiResponse({ 
    status: 401, 
    description: "Invalid credentials - Email or password is incorrect",
    type: UnauthorizedResponseDto
  })
  async login(@Req() request: Request): Promise<AuthResponseDto> {
    const loginDto: LoginDto = request.body;
    return this.authService.login(loginDto);
  }

  @Post('signup')
  @ApiOperation({ 
    summary: "User registration",
    description: "Register a new user account. Email must be unique. Returns JWT token and user information."
  })
  @ApiBody({ 
    type: SignupDto,
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
  })
  @ApiResponse({ 
    status: 201, 
    description: "User registered successfully - Returns JWT token and user information", 
    type: AuthResponseDto
  })
  @ApiResponse({ 
    status: 409, 
    description: "User with this email already exists",
    type: ErrorResponseDto
  })
  async signup(@Body() signupDto: SignupDto): Promise<AuthResponseDto> {
    return this.authService.signup(signupDto);
  }

  @Post('forgot-password')
  @ApiOperation({ 
    summary: "Request password reset",
    description: "Send password reset email to user. Always returns success for security reasons, even if email doesn't exist."
  })
  @ApiBody({ 
    type: ForgotPasswordDto,
    examples: {
      forgotPassword: {
        summary: "Password Reset Request",
        description: "Request password reset for an email",
        value: {
          email: "john.doe@example.com"
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: "Password reset email sent if user exists",
    type: MessageResponseDto
  })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('reset-password')
  @ApiOperation({ 
    summary: "Reset password with token",
    description: "Reset user password using the token received via email."
  })
  @ApiBody({ 
    type: ResetPasswordDto,
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
  })
  @ApiResponse({ 
    status: 200, 
    description: "Password reset successful",
    type: MessageResponseDto
  })
  @ApiResponse({ 
    status: 400, 
    description: "Invalid or expired reset token",
    type: ErrorResponseDto
  })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }
}
