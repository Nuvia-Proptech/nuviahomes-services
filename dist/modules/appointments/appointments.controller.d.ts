import { AppointmentsService } from "./appointments.service";
import type { CreateAppointmentDto } from "./dto/create-appointment.dto";
import type { UpdateAppointmentStatusDto } from "./dto/update-appointment-status.dto";
import type { AppointmentStatus } from "./schemas/appointment.schema";
export declare class AppointmentsController {
    private readonly appointmentsService;
    constructor(appointmentsService: AppointmentsService);
    create(createAppointmentDto: CreateAppointmentDto, user: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/appointment.schema").Appointment, {}, {}> & import("./schemas/appointment.schema").Appointment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getUpcomingAppointments(user: any): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/appointment.schema").Appointment, {}, {}> & import("./schemas/appointment.schema").Appointment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getAgentAppointments(user: any, status?: AppointmentStatus): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/appointment.schema").Appointment, {}, {}> & import("./schemas/appointment.schema").Appointment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getUserAppointments(user: any, status?: AppointmentStatus): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/appointment.schema").Appointment, {}, {}> & import("./schemas/appointment.schema").Appointment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getAppointmentById(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/appointment.schema").Appointment, {}, {}> & import("./schemas/appointment.schema").Appointment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateStatus(id: string, updateDto: UpdateAppointmentStatusDto, user: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/appointment.schema").Appointment, {}, {}> & import("./schemas/appointment.schema").Appointment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    addAgentNotes(id: string, notes: string, user: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/appointment.schema").Appointment, {}, {}> & import("./schemas/appointment.schema").Appointment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    cancel(id: string, user: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/appointment.schema").Appointment, {}, {}> & import("./schemas/appointment.schema").Appointment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
