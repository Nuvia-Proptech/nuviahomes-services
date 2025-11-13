import type { Model } from "mongoose";
import { Appointment, AppointmentStatus } from "./schemas/appointment.schema";
import type { CreateAppointmentDto } from "./dto/create-appointment.dto";
import type { UpdateAppointmentStatusDto } from "./dto/update-appointment-status.dto";
export declare class AppointmentsService {
    private readonly appointmentModel;
    constructor(appointmentModel: Model<Appointment>);
    create(createAppointmentDto: CreateAppointmentDto, userId: string): Promise<import("mongoose").Document<unknown, {}, Appointment, {}, {}> & Appointment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getAgentAppointments(agentId: string, status?: AppointmentStatus): Promise<(import("mongoose").Document<unknown, {}, Appointment, {}, {}> & Appointment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getUserAppointments(userId: string, status?: AppointmentStatus): Promise<(import("mongoose").Document<unknown, {}, Appointment, {}, {}> & Appointment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getAppointmentById(id: string): Promise<import("mongoose").Document<unknown, {}, Appointment, {}, {}> & Appointment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateStatus(id: string, updateDto: UpdateAppointmentStatusDto, userId: string): Promise<import("mongoose").Document<unknown, {}, Appointment, {}, {}> & Appointment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    addAgentNotes(id: string, notes: string, userId: string): Promise<import("mongoose").Document<unknown, {}, Appointment, {}, {}> & Appointment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    cancel(id: string, userId: string): Promise<import("mongoose").Document<unknown, {}, Appointment, {}, {}> & Appointment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getUpcomingAppointments(agentId: string): Promise<(import("mongoose").Document<unknown, {}, Appointment, {}, {}> & Appointment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
}
