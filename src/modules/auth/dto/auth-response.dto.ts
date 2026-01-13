import { ApiProperty } from "@nestjs/swagger"
import { UserRole } from "@/common/enums/user-role.enum"

class UserResponseDto {
  @ApiProperty({ 
    example: "507f1f77bcf86cd799439011",
    description: "User's unique identifier"
  })
  id: string

  @ApiProperty({ 
    example: "john.doe@example.com",
    description: "User's email address"
  })
  email: string

  @ApiProperty({ 
    example: "John",
    description: "User's first name"
  })
  firstName: string

  @ApiProperty({ 
    example: "Doe",
    description: "User's last name"
  })
  lastName: string

  @ApiProperty({ 
    example: UserRole.USER,
    enum: UserRole,
    description: "User's role in the system"
  })
  role: UserRole
}

export class AuthResponseDto {
  @ApiProperty({ 
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1MDdmMWY3N2JjZjg2Y2Q3OTk0MzkwMTEiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2NDI2NzI2MDAsImV4cCI6MTY0MjY3NjIwMH0.example_signature",
    description: "JWT access token for authentication"
  })
  access_token: string

  @ApiProperty({ 
    type: UserResponseDto,
    description: "User information"
  })
  user: UserResponseDto
}
