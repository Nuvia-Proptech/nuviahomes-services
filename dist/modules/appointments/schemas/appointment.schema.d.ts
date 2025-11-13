import { Document, Types } from "mongoose";
export declare enum AppointmentStatus {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    COMPLETED = "completed",
    CANCELLED = "cancelled",
    NO_SHOW = "no_show"
}
export declare enum AppointmentType {
    PROPERTY_VIEWING = "property_viewing",
    AGENT_CONSULTATION = "agent_consultation"
}
export declare class Appointment extends Document {
    appointmentType: AppointmentType;
    agentId: Types.ObjectId;
    userId: Types.ObjectId;
    propertyId?: Types.ObjectId;
    scheduledDate: Date;
    endTime?: Date;
    status: AppointmentStatus;
    notes?: string;
    agentNotes?: string;
    meetingLink?: string;
    location?: string;
}
export declare const AppointmentSchema: import("mongoose").Schema<Appointment, import("mongoose").Model<Appointment, any, any, any, Document<unknown, any, Appointment, any, {}> & Appointment & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Appointment, Document<unknown, {}, import("mongoose").FlatRecord<Appointment>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Appointment> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
