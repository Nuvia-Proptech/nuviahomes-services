import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsOptional, IsString } from "class-validator"
import { UserRole } from "@/common/enums/user-role.enum"

export class ChangeRoleDto {
  @ApiProperty({ 
    enum: [UserRole.AGENT, UserRole.PROPERTY_OWNER], 
    example: UserRole.AGENT,
    description: "New role for the user (can only be AGENT or PROPERTY_OWNER)"
  })
  @IsEnum([UserRole.AGENT, UserRole.PROPERTY_OWNER])
  newRole: UserRole.AGENT | UserRole.PROPERTY_OWNER

  @ApiProperty({ 
    example: "I have 5 years of real estate experience and want to become an agent",
    required: false,
    description: "Optional reason for the role change request"
  })
  @IsOptional()
  @IsString()
  reason?: string
}