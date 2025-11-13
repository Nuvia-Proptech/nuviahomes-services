import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"

export enum AppointmentStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  NO_SHOW = "no_show",
}

export enum AppointmentType {
  PROPERTY_VIEWING = "property_viewing",
  AGENT_CONSULTATION = "agent_consultation",
}

@Schema({ timestamps: true })
export class Appointment extends Document {
  @Prop({ required: true, enum: AppointmentType })
  appointmentType: AppointmentType

  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  agentId: Types.ObjectId

  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  userId: Types.ObjectId

  @Prop({ type: Types.ObjectId, ref: "Property" })
  propertyId?: Types.ObjectId

  @Prop({ required: true })
  scheduledDate: Date

  @Prop()
  endTime?: Date

  @Prop({ default: AppointmentStatus.PENDING, enum: AppointmentStatus })
  status: AppointmentStatus

  @Prop()
  notes?: string

  @Prop()
  agentNotes?: string

  @Prop()
  meetingLink?: string

  @Prop()
  location?: string
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment)
