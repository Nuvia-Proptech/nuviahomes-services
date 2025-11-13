"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const appointment_schema_1 = require("./schemas/appointment.schema");
let AppointmentsService = class AppointmentsService {
    appointmentModel;
    constructor(appointmentModel) {
        this.appointmentModel = appointmentModel;
    }
    async create(createAppointmentDto, userId) {
        const appointmentDate = new Date(createAppointmentDto.scheduledDate);
        if (appointmentDate < new Date()) {
            throw new common_1.BadRequestException("Appointment date must be in the future");
        }
        const existingAppointment = await this.appointmentModel.findOne({
            agentId: createAppointmentDto.agentId,
            scheduledDate: {
                $gte: new Date(appointmentDate.getTime() - 60 * 60 * 1000),
                $lt: new Date(appointmentDate.getTime() + 60 * 60 * 1000),
            },
            status: { $nin: [appointment_schema_1.AppointmentStatus.CANCELLED] },
        });
        if (existingAppointment) {
            throw new common_1.BadRequestException("Agent has another appointment at this time");
        }
        const appointment = new this.appointmentModel({
            ...createAppointmentDto,
            userId,
            status: appointment_schema_1.AppointmentStatus.PENDING,
        });
        return appointment.save();
    }
    async getAgentAppointments(agentId, status) {
        const filter = { agentId };
        if (status)
            filter.status = status;
        return this.appointmentModel
            .find(filter)
            .populate("userId", "firstName lastName email phone")
            .populate("propertyId", "title address")
            .sort({ scheduledDate: 1 });
    }
    async getUserAppointments(userId, status) {
        const filter = { userId };
        if (status)
            filter.status = status;
        return this.appointmentModel
            .find(filter)
            .populate("agentId", "firstName lastName email phone")
            .populate("propertyId", "title address")
            .sort({ scheduledDate: 1 });
    }
    async getAppointmentById(id) {
        const appointment = await this.appointmentModel
            .findById(id)
            .populate("userId", "firstName lastName email phone")
            .populate("agentId", "firstName lastName email phone")
            .populate("propertyId");
        if (!appointment) {
            throw new common_1.NotFoundException("Appointment not found");
        }
        return appointment;
    }
    async updateStatus(id, updateDto, userId) {
        const appointment = await this.appointmentModel.findById(id);
        if (!appointment) {
            throw new common_1.NotFoundException("Appointment not found");
        }
        if (appointment.agentId.toString() !== userId) {
            throw new common_1.ForbiddenException("Only the agent can update appointment status");
        }
        appointment.status = updateDto.status;
        return appointment.save();
    }
    async addAgentNotes(id, notes, userId) {
        const appointment = await this.appointmentModel.findById(id);
        if (!appointment) {
            throw new common_1.NotFoundException("Appointment not found");
        }
        if (appointment.agentId.toString() !== userId) {
            throw new common_1.ForbiddenException("Only the agent can add notes");
        }
        appointment.agentNotes = notes;
        return appointment.save();
    }
    async cancel(id, userId) {
        const appointment = await this.appointmentModel.findById(id);
        if (!appointment) {
            throw new common_1.NotFoundException("Appointment not found");
        }
        if (appointment.userId.toString() !== userId && appointment.agentId.toString() !== userId) {
            throw new common_1.ForbiddenException("You can only cancel your own appointments");
        }
        appointment.status = appointment_schema_1.AppointmentStatus.CANCELLED;
        return appointment.save();
    }
    async getUpcomingAppointments(agentId) {
        return this.appointmentModel
            .find({
            agentId,
            scheduledDate: { $gte: new Date() },
            status: { $in: [appointment_schema_1.AppointmentStatus.PENDING, appointment_schema_1.AppointmentStatus.CONFIRMED] },
        })
            .populate("userId", "firstName lastName email")
            .populate("propertyId", "title address")
            .sort({ scheduledDate: 1 })
            .limit(5);
    }
};
exports.AppointmentsService = AppointmentsService;
exports.AppointmentsService = AppointmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(appointment_schema_1.Appointment.name)),
    __metadata("design:paramtypes", [Function])
], AppointmentsService);
//# sourceMappingURL=appointments.service.js.map