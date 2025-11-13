import { Controller, Post, Req } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { AuthService } from "./auth.service"
import type { LoginDto } from "./dto/login.dto"
import type { AuthResponseDto } from "./dto/auth-response.dto"
import type { Request } from "express"

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Req() request: Request): Promise<AuthResponseDto> {
    const loginDto: LoginDto = request.body;
    return this.authService.login(loginDto);
  }
}
