import { Controller, Post, Get, Patch, Delete, Param, UseGuards } from "@nestjs/common"
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger"
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
  async submitContact(submitContactDto: SubmitContactDto, @CurrentUser() currentUser?: any) {
    return this.contactService.submitContact(submitContactDto, currentUser?.id)
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiBearerAuth()
  async getAllSubmissions() {
    return this.contactService.getAllSubmissions()
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiBearerAuth()
  async getSubmissionById(@Param('id') id: string) {
    return this.contactService.getSubmissionById(id)
  }

  @Patch(':id/read')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiBearerAuth()
  async markAsRead(@Param('id') id: string) {
    return this.contactService.markAsRead(id)
  }

  @Patch(":id/respond")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiBearerAuth()
  async respondToContact(@Param('id') id: string, body: { response: string }) {
    return this.contactService.respondToContact(id, body.response)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiBearerAuth()
  async deleteSubmission(@Param('id') id: string) {
    return this.contactService.deleteSubmission(id)
  }
}
