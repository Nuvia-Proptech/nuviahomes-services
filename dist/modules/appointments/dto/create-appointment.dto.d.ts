import { AppointmentType } from "../schemas/appointment.schema";
export declare class CreateAppointmentDto {
    appointmentType: AppointmentType;
    agentId: string;
    propertyId?: string;
    scheduledDate: string;
    notes?: string;
    location?: string;
}
