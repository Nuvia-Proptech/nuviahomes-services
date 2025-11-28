import { Controller, Get, Post, Body, Param, Patch, UseGuards, Query } from "@nestjs/common"
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam, ApiQuery } from "@nestjs/swagger"
import { AppointmentsService } from "./appointments.service"
import type { CreateAppointmentDto } from "./dto/create-appointment.dto"
import type { UpdateAppointmentStatusDto } from "./dto/update-appointment-status.dto"
import { JwtAuthGuard } from "@/modules/auth/guards/jwt-auth.guard"
import { CurrentUser } from "@/modules/auth/decorators/current-user.decorator"
import type { AppointmentStatus } from "./schemas/appointment.schema"

@ApiTags("Appointments")
@ApiBearerAuth()
@Controller("appointments")
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Create a new appointment" })
  @ApiResponse({ status: 201, description: "Appointment created successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async create(@Body() createAppointmentDto: CreateAppointmentDto, @CurrentUser() user: any) {
    return this.appointmentsService.create(createAppointmentDto, user.id)
  }

  @Get("agent/upcoming")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Get upcoming appointments for agent" })
  @ApiResponse({ status: 200, description: "Returns upcoming appointments" })
  async getUpcomingAppointments(@CurrentUser() user: any) {
    return this.appointmentsService.getUpcomingAppointments(user.id)
  }

  @Get("agent")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Get all appointments for agent" })
  @ApiQuery({ name: "status", required: false, description: "Filter by appointment status" })
  @ApiResponse({ status: 200, description: "Returns agent appointments" })
  async getAgentAppointments(@CurrentUser() user: any, @Query('status') status?: AppointmentStatus) {
    return this.appointmentsService.getAgentAppointments(user.id, status)
  }

  @Get("user")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Get all appointments for user" })
  @ApiQuery({ name: "status", required: false, description: "Filter by appointment status" })
  @ApiResponse({ status: 200, description: "Returns user appointments" })
  async getUserAppointments(@CurrentUser() user: any, @Query('status') status?: AppointmentStatus) {
    return this.appointmentsService.getUserAppointments(user.id, status)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Get appointment by ID" })
  @ApiParam({ name: "id", description: "Appointment ID" })
  @ApiResponse({ status: 200, description: "Returns appointment details" })
  @ApiResponse({ status: 404, description: "Appointment not found" })
  async getAppointmentById(@Param('id') id: string) {
    return this.appointmentsService.getAppointmentById(id);
  }

  @Patch(":id/status")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Update appointment status" })
  @ApiParam({ name: "id", description: "Appointment ID" })
  @ApiResponse({ status: 200, description: "Status updated successfully" })
  async updateStatus(@Param('id') id: string, @Body() updateDto: UpdateAppointmentStatusDto, @CurrentUser() user: any) {
    return this.appointmentsService.updateStatus(id, updateDto, user.id)
  }

  @Post(":id/notes")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Add agent notes to appointment" })
  @ApiParam({ name: "id", description: "Appointment ID" })
  @ApiResponse({ status: 200, description: "Notes added successfully" })
  async addAgentNotes(@Param('id') id: string, @Body('notes') notes: string, @CurrentUser() user: any) {
    return this.appointmentsService.addAgentNotes(id, notes, user.id)
  }

  @Post(":id/cancel")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Cancel appointment" })
  @ApiParam({ name: "id", description: "Appointment ID" })
  @ApiResponse({ status: 200, description: "Appointment cancelled successfully" })
  async cancel(@Param('id') id: string, @CurrentUser() user: any) {
    return this.appointmentsService.cancel(id, user.id)
  }
}
