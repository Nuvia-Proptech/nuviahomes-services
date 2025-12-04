import { Injectable, UnauthorizedException, BadRequestException, ConflictException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { InjectModel } from "@nestjs/mongoose"
import type { Model } from "mongoose"
import * as bcrypt from "bcryptjs"
import * as crypto from "crypto"
import { UsersService } from "@/modules/users/users.service"
import { User } from "@/modules/users/schemas/user.schema"
import type { LoginDto } from "./dto/login.dto"
import type { SignupDto } from "./dto/signup.dto"
import type { ForgotPasswordDto } from "./dto/forgot-password.dto"
import type { ResetPasswordDto } from "./dto/reset-password.dto"
import { UserRole } from "@/common/enums/user-role.enum"

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
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

  async signup(signupDto: SignupDto) {
    const existingUser = await this.usersService.findByEmail(signupDto.email)
    
    if (existingUser) {
      throw new ConflictException("User with this email already exists")
    }

    const hashedPassword = await bcrypt.hash(signupDto.password, 10)
    
    const user = new this.userModel({
      firstName: signupDto.firstName,
      lastName: signupDto.lastName,
      email: signupDto.email,
      password: hashedPassword,
      role: signupDto.role || UserRole.USER,
      phone: signupDto.phone,
      isVerified: false,
      isActive: true,
    })

    await user.save()

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

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.usersService.findByEmail(forgotPasswordDto.email)

    if (!user) {
      // Don't reveal if user exists or not for security
      return { message: "If the email exists, a password reset link has been sent" }
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex")
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    // Set token and expiry (1 hour from now)
    user.resetPasswordToken = hashedToken
    user.resetPasswordExpires = new Date(Date.now() + 3600000)
    await user.save()

    // TODO: Send email with reset token
    // In production, you would send an email here with the resetToken
    // For now, we'll return it in the response (remove this in production!)
    
    return { 
      message: "If the email exists, a password reset link has been sent",
      // Remove this in production - only for development/testing
      resetToken 
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const hashedToken = crypto.createHash("sha256").update(resetPasswordDto.token).digest("hex")

    const user = await this.userModel.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: new Date() },
    })

    if (!user) {
      throw new BadRequestException("Invalid or expired reset token")
    }

    // Update password
    user.password = await bcrypt.hash(resetPasswordDto.newPassword, 10)
    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined
    await user.save()

    return { message: "Password has been reset successfully" }
  }
}
