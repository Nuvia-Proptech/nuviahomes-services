import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, MinLength, IsEnum, IsOptional } from "class-validator"
import { UserRole } from "@/common/enums/user-role.enum"

export class SignupDto {
  @ApiProperty({ example: "John", description: "User's first name" })
  @IsString()
  firstName: string

  @ApiProperty({ example: "Doe", description: "User's last name" })
  @IsString()
  lastName: string

  @ApiProperty({ example: "john.doe@example.com", description: "User's email address" })
  @IsEmail()
  email: string

  @ApiProperty({ example: "Password123!", description: "User's password (minimum 6 characters)" })
  @IsString()
  @MinLength(6)
  password: string

  @ApiProperty({ 
    example: UserRole.USER, 
    description: "User role", 
    enum: UserRole,
    default: UserRole.USER 
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole

  @ApiProperty({ example: "+1234567890", description: "User's phone number", required: false })
  @IsString()
  @IsOptional()
  phone?: string
}
