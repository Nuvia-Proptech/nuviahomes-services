import { Controller, Post, Req, Body } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger"
import { AuthService } from "./auth.service"
import { LoginDto } from "./dto/login.dto"
import { AuthResponseDto } from "./dto/auth-response.dto"
import type { Request } from "express"

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: "User login" })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: "Login successful", type: AuthResponseDto })
  @ApiResponse({ status: 401, description: "Invalid credentials" })
  async login(@Req() request: Request): Promise<AuthResponseDto> {
    const loginDto: LoginDto = request.body;
    return this.authService.login(loginDto);
  }
}
