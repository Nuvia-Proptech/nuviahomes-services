import { Injectable, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import * as bcrypt from "bcryptjs"
import { UsersService } from "@/modules/users/users.service"
import type { LoginDto } from "./dto/login.dto"

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email)

    if (!user) {
      throw new UnauthorizedException("Invalid email or password")
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid email or password")
    }

    if (!user.isActive) {
      throw new UnauthorizedException("User account is inactive")
    }

    const payload = { sub: user._id, email: user.email, role: user.role }
    const access_token = this.jwtService.sign(payload)

    return {
      access_token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    }
  }
}
