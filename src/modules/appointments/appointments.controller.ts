import { Controller, Get, Post, Body, Param, Patch, UseGuards, Query } from "@nestjs/common"
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger"
import { AppointmentsService } from "./appointments.service"
import type { CreateAppointmentDto } from "./dto/create-appointment.dto"
import type { UpdateAppointmentStatusDto } from "./dto/update-appointment-status.dto"
import { JwtAuthGuard } from "@/modules/auth/guards/jwt-auth.guard"
import type { AppointmentStatus } from "./schemas/appointment.schema"

@ApiTags("Appointments")
@ApiBearerAuth()
@Controller("appointments")
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(createAppointmentDto: CreateAppointmentDto, user: any) {
    return this.appointmentsService.create(createAppointmentDto, user.id)
  }

  @Get("agent/upcoming")
  @UseGuards(JwtAuthGuard)
  async getUpcomingAppointments(user: any) {
    return this.appointmentsService.getUpcomingAppointments(user.id)
  }

  @Get("agent")
  @UseGuards(JwtAuthGuard)
  async getAgentAppointments(user: any, @Query('status') status?: AppointmentStatus) {
    return this.appointmentsService.getAgentAppointments(user.id, status)
  }

  @Get("user")
  @UseGuards(JwtAuthGuard)
  async getUserAppointments(user: any, @Query('status') status?: AppointmentStatus) {
    return this.appointmentsService.getUserAppointments(user.id, status)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getAppointmentById(@Param('id') id: string) {
    return this.appointmentsService.getAppointmentById(id);
  }

  @Patch(":id/status")
  @UseGuards(JwtAuthGuard)
  async updateStatus(@Param('id') id: string, updateDto: UpdateAppointmentStatusDto, user: any) {
    return this.appointmentsService.updateStatus(id, updateDto, user.id)
  }

  @Post(":id/notes")
  @UseGuards(JwtAuthGuard)
  async addAgentNotes(@Param('id') id: string, @Body('notes') notes: string, user: any) {
    return this.appointmentsService.addAgentNotes(id, notes, user.id)
  }

  @Post(":id/cancel")
  @UseGuards(JwtAuthGuard)
  async cancel(@Param('id') id: string, user: any) {
    return this.appointmentsService.cancel(id, user.id)
  }
}
