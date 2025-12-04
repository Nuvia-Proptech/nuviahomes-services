import { ApiProperty } from "@nestjs/swagger"
import { IsEmail } from "class-validator"

export class ForgotPasswordDto {
  @ApiProperty({ example: "john.doe@example.com", description: "User's email address" })
  @IsEmail()
  email: string
}
