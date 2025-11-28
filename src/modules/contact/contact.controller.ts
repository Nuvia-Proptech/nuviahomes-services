import { Controller, Post, Get, Patch, Delete, Param, UseGuards, Body } from "@nestjs/common"
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger"
import { ContactService } from "./contact.service"
import type { SubmitContactDto } from "./dto/submit-contact.dto"
import { JwtAuthGuard } from "@/modules/auth/guards/jwt-auth.guard"
import { RolesGuard } from "@/modules/auth/guards/roles.guard"
import { Roles } from "@/modules/auth/decorators/roles.decorator"
import { CurrentUser } from "@/modules/auth/decorators/current-user.decorator"
import { UserRole } from "@/common/enums/user-role.enum"

@ApiTags("Contact")
@Controller("contact")
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @ApiOperation({ summary: "Submit a contact form" })
  @ApiResponse({ status: 201, description: "Contact form submitted successfully" })
  async submitContact(@Body() submitContactDto: SubmitContactDto, @CurrentUser() currentUser?: any) {
    return this.contactService.submitContact(submitContactDto, currentUser?.id)
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get all contact submissions (Admin only)" })
  @ApiResponse({ status: 200, description: "Returns all contact submissions" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  async getAllSubmissions() {
    return this.contactService.getAllSubmissions()
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get contact submission by ID (Admin only)" })
  @ApiParam({ name: "id", description: "Submission ID" })
  @ApiResponse({ status: 200, description: "Returns contact submission" })
  @ApiResponse({ status: 404, description: "Submission not found" })
  async getSubmissionById(@Param('id') id: string) {
    return this.contactService.getSubmissionById(id)
  }

  @Patch(':id/read')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Mark submission as read (Admin only)" })
  @ApiParam({ name: "id", description: "Submission ID" })
  @ApiResponse({ status: 200, description: "Marked as read successfully" })
  async markAsRead(@Param('id') id: string) {
    return this.contactService.markAsRead(id)
  }

  @Patch(":id/respond")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Respond to contact submission (Admin only)" })
  @ApiParam({ name: "id", description: "Submission ID" })
  @ApiResponse({ status: 200, description: "Response sent successfully" })
  async respondToContact(@Param('id') id: string, @Body() body: { response: string }) {
    return this.contactService.respondToContact(id, body.response)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete contact submission (Admin only)" })
  @ApiParam({ name: "id", description: "Submission ID" })
  @ApiResponse({ status: 200, description: "Submission deleted successfully" })
  async deleteSubmission(@Param('id') id: string) {
    return this.contactService.deleteSubmission(id)
  }
}
