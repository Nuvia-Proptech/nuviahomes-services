import { ApiProperty } from "@nestjs/swagger"
import { IsString, MinLength } from "class-validator"

export class ResetPasswordDto {
  @ApiProperty({ example: "abc123token", description: "Password reset token" })
  @IsString()
  token: string

  @ApiProperty({ example: "NewPassword123!", description: "New password (minimum 6 characters)" })
  @IsString()
  @MinLength(6)
  newPassword: string
}
