import { ApiProperty } from "@nestjs/swagger"
import { UserRole } from "@/common/enums/user-role.enum"

export class AgentRequestResponseDto {
  @ApiProperty({ 
    example: "507f1f77bcf86cd799439011",
    description: "Request ID"
  })
  _id: string

  @ApiProperty({ 
    example: "507f1f77bcf86cd799439012",
    description: "User ID who made the request"
  })
  userId: string

  @ApiProperty({ 
    example: "I have 5+ years of experience in real estate and want to become an agent on your platform.",
    description: "Reason for requesting agent status"
  })
  reason: string

  @ApiProperty({ 
    example: "Real Estate Pro Inc.",
    description: "Current company or agency",
    required: false
  })
  company?: string

  @ApiProperty({ 
    example: "https://myrealestate.com",
    description: "Professional website URL",
    required: false
  })
  website?: string

  @ApiProperty({ 
    example: "Licensed real estate agent with specialization in residential properties",
    description: "Professional bio",
    required: false
  })
  bio?: string

  @ApiProperty({ 
    example: "REL123456789",
    description: "Real estate license number",
    required: false
  })
  licenseNumber?: string

  @ApiProperty({ 
    example: "pending",
    enum: ["pending", "approved", "rejected"],
    description: "Status of the agent request"
  })
  status: "pending" | "approved" | "rejected"

  @ApiProperty({ 
    example: "Your application has been approved. Welcome to our agent network!",
    description: "Admin comments or feedback",
    required: false
  })
  adminComments?: string

  @ApiProperty({ 
    example: "507f1f77bcf86cd799439013",
    description: "Admin who processed the request",
    required: false
  })
  approvedBy?: string

  @ApiProperty({ 
    example: "2024-01-15T10:30:00.000Z",
    description: "Request creation timestamp"
  })
  createdAt: string

  @ApiProperty({ 
    example: "2024-01-15T14:30:00.000Z",
    description: "Last update timestamp"
  })
  updatedAt: string

  @ApiProperty({ 
    description: "User information",
    required: false
  })
  user?: {
    _id: string
    firstName: string
    lastName: string
    email: string
    role: UserRole
  }
}