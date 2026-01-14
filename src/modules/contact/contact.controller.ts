import { Controller, Post, Get, Patch, Delete, Param, UseGuards, Body } from "@nestjs/common"
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam, ApiBody } from "@nestjs/swagger"
import { ContactService } from "./contact.service"
import { SubmitContactDto } from "./dto/submit-contact.dto"
import { ContactSubmissionResponseDto, RespondToContactDto } from "./dto/contact-response.dto"
import { JwtAuthGuard } from "@/modules/auth/guards/jwt-auth.guard"
import { RolesGuard } from "@/modules/auth/guards/roles.guard"
import { Roles } from "@/modules/auth/decorators/roles.decorator"
import { CurrentUser } from "@/modules/auth/decorators/current-user.decorator"
import { UserRole } from "@/common/enums/user-role.enum"
import { ErrorResponseDto, NotFoundResponseDto, UnauthorizedResponseDto } from "@/common/dto/error-response.dto"
import { MessageResponseDto } from "@/common/dto/success-response.dto"

@ApiTags("Contact")
@Controller("contact")
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @ApiOperation({ 
    summary: "Submit a contact form",
    description: "Submit a contact form inquiry. Can be submitted by both authenticated and anonymous users."
  })
  @ApiBody({ 
    type: SubmitContactDto,
    examples: {
      investmentInquiry: {
        summary: "Investment Inquiry",
        description: "Example of an investment-related contact form",
        value: {
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "+1234567890",
          subject: "Inquiry about Property Investment",
          message: "Hello, I am interested in learning more about your investment opportunities. Could you please provide more information about the downtown apartment complex project? I would also like to know about the minimum investment requirements and expected returns."
        }
      },
      propertyInquiry: {
        summary: "Property Inquiry",
        description: "Example of a property-related contact form",
        value: {
          name: "Jane Smith",
          email: "jane.smith@example.com",
          phone: "+1987654321",
          subject: "Property Listing Question",
          message: "I saw your listing for the 3-bedroom house on Main Street. Is it still available? I would like to schedule a viewing and get more details about the property."
        }
      },
      generalInquiry: {
        summary: "General Inquiry",
        description: "Example of a general contact form",
        value: {
          name: "Mike Johnson",
          email: "mike.johnson@example.com",
          phone: "+1555123456",
          subject: "General Information Request",
          message: "I would like to learn more about your services and how you can help me with real estate investments. Please contact me to discuss my options."
        }
      }
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: "Contact form submitted successfully",
    type: ContactSubmissionResponseDto
  })
  @ApiResponse({ 
    status: 400, 
    description: "Bad request - Invalid form data",
    type: ErrorResponseDto
  })
  async submitContact(@Body() submitContactDto: SubmitContactDto, @CurrentUser() currentUser?: any) {
    return this.contactService.submitContact(submitContactDto, currentUser?.id)
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: "Get all contact submissions (Admin only)",
    description: "Retrieve all contact form submissions. Only super admins and admins can access this endpoint."
  })
  @ApiResponse({ 
    status: 200, 
    description: "Returns all contact submissions",
    type: [ContactSubmissionResponseDto]
  })
  @ApiResponse({ 
    status: 401, 
    description: "Unauthorized - Invalid or missing JWT token",
    type: UnauthorizedResponseDto
  })
  @ApiResponse({ 
    status: 403, 
    description: "Forbidden - insufficient permissions",
    type: ErrorResponseDto
  })
  async getAllSubmissions() {
    return this.contactService.getAllSubmissions()
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: "Get contact submission by ID (Admin only)",
    description: "Retrieve a specific contact submission by its ID. Only super admins and admins can access this endpoint."
  })
  @ApiParam({ 
    name: "id", 
    description: "Contact submission unique identifier",
    example: "507f1f77bcf86cd799439015"
  })
  @ApiResponse({ 
    status: 200, 
    description: "Returns contact submission details",
    type: ContactSubmissionResponseDto
  })
  @ApiResponse({ 
    status: 401, 
    description: "Unauthorized - Invalid or missing JWT token",
    type: UnauthorizedResponseDto
  })
  @ApiResponse({ 
    status: 403, 
    description: "Forbidden - insufficient permissions",
    type: ErrorResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: "Submission not found",
    type: NotFoundResponseDto
  })
  async getSubmissionById(@Param('id') id: string) {
    return this.contactService.getSubmissionById(id)
  }

  @Patch(':id/read')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: "Mark submission as read (Admin only)",
    description: "Mark a contact submission as read. Only super admins and admins can perform this action."
  })
  @ApiParam({ 
    name: "id", 
    description: "Contact submission unique identifier",
    example: "507f1f77bcf86cd799439015"
  })
  @ApiResponse({ 
    status: 200, 
    description: "Marked as read successfully",
    type: ContactSubmissionResponseDto
  })
  @ApiResponse({ 
    status: 401, 
    description: "Unauthorized - Invalid or missing JWT token",
    type: UnauthorizedResponseDto
  })
  @ApiResponse({ 
    status: 403, 
    description: "Forbidden - insufficient permissions",
    type: ErrorResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: "Submission not found",
    type: NotFoundResponseDto
  })
  async markAsRead(@Param('id') id: string) {
    return this.contactService.markAsRead(id)
  }

  @Patch(":id/respond")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: "Respond to contact submission (Admin only)",
    description: "Send a response to a contact submission. Only super admins and admins can respond to submissions."
  })
  @ApiParam({ 
    name: "id", 
    description: "Contact submission unique identifier",
    example: "507f1f77bcf86cd799439015"
  })
  @ApiBody({ 
    type: RespondToContactDto,
    examples: {
      investmentResponse: {
        summary: "Investment Inquiry Response",
        description: "Response to an investment-related inquiry",
        value: {
          response: "Thank you for your inquiry about our investment opportunities. We have reviewed your request and would like to schedule a call to discuss the downtown apartment complex project in detail. Our minimum investment is $10,000 with an expected ROI of 15.5% over 18 months. Please let us know your availability for a call this week."
        }
      },
      propertyResponse: {
        summary: "Property Inquiry Response",
        description: "Response to a property-related inquiry",
        value: {
          response: "Thank you for your interest in the 3-bedroom house on Main Street. The property is still available and we would be happy to schedule a viewing. The asking price is $450,000 and it features modern amenities with a 2-car garage. Please let us know your preferred viewing times."
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: "Response sent successfully",
    type: ContactSubmissionResponseDto
  })
  @ApiResponse({ 
    status: 401, 
    description: "Unauthorized - Invalid or missing JWT token",
    type: UnauthorizedResponseDto
  })
  @ApiResponse({ 
    status: 403, 
    description: "Forbidden - insufficient permissions",
    type: ErrorResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: "Submission not found",
    type: NotFoundResponseDto
  })
  async respondToContact(@Param('id') id: string, @Body() body: RespondToContactDto) {
    return this.contactService.respondToContact(id, body.response)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: "Delete contact submission (Admin only)",
    description: "Delete a contact submission permanently. Only super admins and admins can delete submissions."
  })
  @ApiParam({ 
    name: "id", 
    description: "Contact submission unique identifier",
    example: "507f1f77bcf86cd799439015"
  })
  @ApiResponse({ 
    status: 200, 
    description: "Submission deleted successfully",
    type: MessageResponseDto
  })
  @ApiResponse({ 
    status: 401, 
    description: "Unauthorized - Invalid or missing JWT token",
    type: UnauthorizedResponseDto
  })
  @ApiResponse({ 
    status: 403, 
    description: "Forbidden - insufficient permissions",
    type: ErrorResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: "Submission not found",
    type: NotFoundResponseDto
  })
  async deleteSubmission(@Param('id') id: string) {
    return this.contactService.deleteSubmission(id)
  }
}
