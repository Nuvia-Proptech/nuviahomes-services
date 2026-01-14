import { ApiProperty } from "@nestjs/swagger"

export class ContactSubmissionResponseDto {
  @ApiProperty({ 
    example: "507f1f77bcf86cd799439015",
    description: "Submission's unique identifier"
  })
  _id: string

  @ApiProperty({ 
    example: "John Doe",
    description: "Contact person's name"
  })
  name: string

  @ApiProperty({ 
    example: "john.doe@example.com",
    description: "Contact person's email address"
  })
  email: string

  @ApiProperty({ 
    example: "+1234567890",
    description: "Contact person's phone number",
    required: false
  })
  phone?: string

  @ApiProperty({ 
    example: "Inquiry about Property Investment",
    description: "Subject of the contact message"
  })
  subject: string

  @ApiProperty({ 
    example: "Hello, I am interested in learning more about your investment opportunities. Could you please provide more information about the downtown apartment complex project?",
    description: "Contact message content"
  })
  message: string

  @ApiProperty({ 
    example: "507f1f77bcf86cd799439011",
    description: "User ID if submitted by registered user",
    required: false
  })
  userId?: string

  @ApiProperty({ 
    example: false,
    description: "Whether the submission has been read by admin"
  })
  isRead: boolean

  @ApiProperty({ 
    example: "Thank you for your inquiry. We will contact you within 24 hours with detailed information about our investment opportunities.",
    description: "Admin response to the contact submission",
    required: false
  })
  response?: string

  @ApiProperty({ 
    example: "2024-01-20T16:30:00.000Z",
    description: "When admin responded to the submission",
    required: false
  })
  respondedAt?: string

  @ApiProperty({ 
    example: "2024-01-18T14:20:00.000Z",
    description: "Submission creation timestamp"
  })
  createdAt: string

  @ApiProperty({ 
    example: "2024-01-20T16:30:00.000Z",
    description: "Last update timestamp"
  })
  updatedAt: string
}

export class ContactSubmissionStatsDto {
  @ApiProperty({ 
    example: 156,
    description: "Total number of submissions"
  })
  totalSubmissions: number

  @ApiProperty({ 
    example: 23,
    description: "Number of unread submissions"
  })
  unreadSubmissions: number

  @ApiProperty({ 
    example: 133,
    description: "Number of read submissions"
  })
  readSubmissions: number

  @ApiProperty({ 
    example: 89,
    description: "Number of submissions with responses"
  })
  respondedSubmissions: number

  @ApiProperty({ 
    example: 12,
    description: "Number of submissions today"
  })
  todaySubmissions: number

  @ApiProperty({ 
    example: 45,
    description: "Number of submissions this week"
  })
  weekSubmissions: number
}

export class RespondToContactDto {
  @ApiProperty({ 
    example: "Thank you for your inquiry about our investment opportunities. We have reviewed your request and would like to schedule a call to discuss the details. Please let us know your availability for next week.",
    description: "Response message to the contact submission"
  })
  response: string
}