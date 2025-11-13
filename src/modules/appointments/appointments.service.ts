import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import type { Model } from "mongoose"
import { Appointment, AppointmentStatus } from "./schemas/appointment.schema"
import type { CreateAppointmentDto } from "./dto/create-appointment.dto"
import type { UpdateAppointmentStatusDto } from "./dto/update-appointment-status.dto"

@Injectable()
export class AppointmentsService {
  constructor(@InjectModel(Appointment.name) private readonly appointmentModel: Model<Appointment>) {}

  async create(createAppointmentDto: CreateAppointmentDto, userId: string) {
    // Validate appointment date is in future
    const appointmentDate = new Date(createAppointmentDto.scheduledDate)
    if (appointmentDate < new Date()) {
      throw new BadRequestException("Appointment date must be in the future")
    }

    // Check for conflicting appointments
    const existingAppointment = await this.appointmentModel.findOne({
      agentId: createAppointmentDto.agentId,
      scheduledDate: {
        $gte: new Date(appointmentDate.getTime() - 60 * 60 * 1000),
        $lt: new Date(appointmentDate.getTime() + 60 * 60 * 1000),
      },
      status: { $nin: [AppointmentStatus.CANCELLED] },
    })

    if (existingAppointment) {
      throw new BadRequestException("Agent has another appointment at this time")
    }

    const appointment = new this.appointmentModel({
      ...createAppointmentDto,
      userId,
      status: AppointmentStatus.PENDING,
    })

    return appointment.save()
  }

  async getAgentAppointments(agentId: string, status?: AppointmentStatus) {
    const filter: any = { agentId }
    if (status) filter.status = status

    return this.appointmentModel
      .find(filter)
      .populate("userId", "firstName lastName email phone")
      .populate("propertyId", "title address")
      .sort({ scheduledDate: 1 })
  }

  async getUserAppointments(userId: string, status?: AppointmentStatus) {
    const filter: any = { userId }
    if (status) filter.status = status

    return this.appointmentModel
      .find(filter)
      .populate("agentId", "firstName lastName email phone")
      .populate("propertyId", "title address")
      .sort({ scheduledDate: 1 })
  }

  async getAppointmentById(id: string) {
    const appointment = await this.appointmentModel
      .findById(id)
      .populate("userId", "firstName lastName email phone")
      .populate("agentId", "firstName lastName email phone")
      .populate("propertyId")

    if (!appointment) {
      throw new NotFoundException("Appointment not found")
    }

    return appointment
  }

  async updateStatus(id: string, updateDto: UpdateAppointmentStatusDto, userId: string) {
    const appointment = await this.appointmentModel.findById(id)
    if (!appointment) {
      throw new NotFoundException("Appointment not found")
    }

    // Only agent or admin can update status
    if (appointment.agentId.toString() !== userId) {
      throw new ForbiddenException("Only the agent can update appointment status")
    }

    appointment.status = updateDto.status
    return appointment.save()
  }

  async addAgentNotes(id: string, notes: string, userId: string) {
    const appointment = await this.appointmentModel.findById(id)
    if (!appointment) {
      throw new NotFoundException("Appointment not found")
    }

    if (appointment.agentId.toString() !== userId) {
      throw new ForbiddenException("Only the agent can add notes")
    }

    appointment.agentNotes = notes
    return appointment.save()
  }

  async cancel(id: string, userId: string) {
    const appointment = await this.appointmentModel.findById(id)
    if (!appointment) {
      throw new NotFoundException("Appointment not found")
    }

    if (appointment.userId.toString() !== userId && appointment.agentId.toString() !== userId) {
      throw new ForbiddenException("You can only cancel your own appointments")
    }

    appointment.status = AppointmentStatus.CANCELLED
    return appointment.save()
  }

  async getUpcomingAppointments(agentId: string) {
    return this.appointmentModel
      .find({
        agentId,
        scheduledDate: { $gte: new Date() },
        status: { $in: [AppointmentStatus.PENDING, AppointmentStatus.CONFIRMED] },
      })
      .populate("userId", "firstName lastName email")
      .populate("propertyId", "title address")
      .sort({ scheduledDate: 1 })
      .limit(5)
  }
}
