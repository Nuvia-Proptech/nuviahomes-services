import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsOptional, IsUrl, MinLength } from "class-validator"

export class AgentUpgradeRequestDto {
  @ApiProperty({ 
    example: "I have 5+ years of experience in real estate and want to become an agent on your platform.",
    description: "Reason for requesting agent status",
    minLength: 50
  })
  @IsString()
  @MinLength(50, { message: "Please provide a detailed reason (minimum 50 characters)" })
  reason: string

  @ApiProperty({ 
    example: "Real Estate Pro Inc.",
    description: "Current company or agency",
    required: false
  })
  @IsString()
  @IsOptional()
  company?: string

  @ApiProperty({ 
    example: "https://myrealestate.com",
    description: "Professional website URL",
    required: false
  })
  @IsUrl()
  @IsOptional()
  website?: string

  @ApiProperty({ 
    example: "Licensed real estate agent with specialization in residential properties",
    description: "Professional bio",
    required: false
  })
  @IsString()
  @IsOptional()
  bio?: string

  @ApiProperty({ 
    example: "REL123456789",
    description: "Real estate license number",
    required: false
  })
  @IsString()
  @IsOptional()
  licenseNumber?: string
}