import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, MinLength } from "class-validator"

export class LoginDto {
  @ApiProperty({ 
    example: "john.doe@example.com",
    description: "User's email address"
  })
  @IsEmail()
  email: string

  @ApiProperty({ 
    example: "Password123!",
    description: "User's password (minimum 6 characters)",
    minLength: 6
  })
  @IsString()
  @MinLength(6)
  password: string
}
