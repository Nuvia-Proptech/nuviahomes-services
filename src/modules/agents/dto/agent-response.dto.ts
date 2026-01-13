import { ApiProperty } from "@nestjs/swagger"
import { UserRole } from "@/common/enums/user-role.enum"

export class SocialLinksDto {
  @ApiProperty({ 
    example: "https://linkedin.com/in/johnagent",
    description: "LinkedIn profile URL",
    required: false
  })
  linkedin?: string

  @ApiProperty({ 
    example: "https://facebook.com/johnagent",
    description: "Facebook profile URL",
    required: false
  })
  facebook?: string

  @ApiProperty({ 
    example: "https://twitter.com/johnagent",
    description: "Twitter profile URL",
    required: false
  })
  twitter?: string

  @ApiProperty({ 
    example: "https://instagram.com/johnagent",
    description: "Instagram profile URL",
    required: false
  })
  instagram?: string
}

export class AgentResponseDto {
  @ApiProperty({ 
    example: "507f1f77bcf86cd799439013",
    description: "Agent's unique identifier"
  })
  _id: string

  @ApiProperty({ 
    example: "John",
    description: "Agent's first name"
  })
  firstName: string

  @ApiProperty({ 
    example: "Agent",
    description: "Agent's last name"
  })
  lastName: string

  @ApiProperty({ 
    example: "john.agent@nuviahomes.com",
    description: "Agent's email address"
  })
  email: string

  @ApiProperty({ 
    example: UserRole.AGENT,
    enum: UserRole,
    description: "User role (should be 'agent')"
  })
  role: UserRole

  @ApiProperty({ 
    example: "+1234567892",
    description: "Agent's phone number",
    required: false
  })
  phone?: string

  @ApiProperty({ 
    example: "https://example.com/john-agent.jpg",
    description: "URL to agent's profile image",
    required: false
  })
  profileImage?: string

  @ApiProperty({ 
    example: "Experienced real estate agent with 8+ years in residential properties. Specializing in first-time home buyers and investment properties.",
    description: "Agent's biography",
    required: false
  })
  bio?: string

  @ApiProperty({ 
    example: "Nuvia Homes",
    description: "Agent's company",
    required: false
  })
  company?: string

  @ApiProperty({ 
    example: "https://johnagent.com",
    description: "Agent's personal website",
    required: false
  })
  website?: string

  @ApiProperty({ 
    type: SocialLinksDto,
    description: "Agent's social media links",
    required: false
  })
  socialLinks?: SocialLinksDto

  @ApiProperty({ 
    example: true,
    description: "Whether the agent is verified"
  })
  isVerified: boolean

  @ApiProperty({ 
    example: true,
    description: "Whether the agent account is active"
  })
  isActive: boolean

  @ApiProperty({ 
    example: "2024-01-10T09:00:00.000Z",
    description: "Account creation timestamp"
  })
  createdAt: string

  @ApiProperty({ 
    example: "2024-01-15T14:30:00.000Z",
    description: "Last update timestamp"
  })
  updatedAt: string
}

export class AgentUpdateDto {
  @ApiProperty({ 
    example: "John",
    description: "Agent's first name",
    required: false
  })
  firstName?: string

  @ApiProperty({ 
    example: "Agent",
    description: "Agent's last name",
    required: false
  })
  lastName?: string

  @ApiProperty({ 
    example: "+1234567892",
    description: "Agent's phone number",
    required: false
  })
  phone?: string

  @ApiProperty({ 
    example: "Updated bio: Experienced real estate agent specializing in luxury properties",
    description: "Agent's biography",
    required: false
  })
  bio?: string

  @ApiProperty({ 
    example: "Nuvia Homes Premium",
    description: "Agent's company",
    required: false
  })
  company?: string

  @ApiProperty({ 
    example: "https://johnagent.com",
    description: "Agent's personal website",
    required: false
  })
  website?: string

  @ApiProperty({ 
    type: SocialLinksDto,
    description: "Agent's social media links",
    required: false
  })
  socialLinks?: SocialLinksDto
}