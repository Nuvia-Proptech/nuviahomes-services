import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, MinLength, IsEnum, IsOptional, IsPhoneNumber } from "class-validator"
import { UserRole } from "@/common/enums/user-role.enum"

export class CreateUserDto {
  @ApiProperty({ example: "John" })
  @IsString()
  firstName: string

  @ApiProperty({ example: "Doe" })
  @IsString()
  lastName: string

  @ApiProperty({ example: "john@example.com" })
  @IsEmail()
  email: string

  @ApiProperty({ example: "password123", minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string

  @ApiProperty({ enum: UserRole, example: UserRole.INVESTOR })
  @IsEnum(UserRole)
  role: UserRole

  @ApiProperty({ example: "+1234567890", required: false })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string

  @ApiProperty({ example: "Senior Agent at XYZ", required: false })
  @IsOptional()
  @IsString()
  bio?: string

  @ApiProperty({ example: "XYZ Real Estate", required: false })
  @IsOptional()
  @IsString()
  company?: string
}
