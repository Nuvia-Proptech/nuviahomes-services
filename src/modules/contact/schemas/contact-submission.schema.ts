import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"

@Schema({ timestamps: true })
export class ContactSubmission extends Document {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  email: string

  @Prop()
  phone?: string

  @Prop({ required: true })
  subject: string

  @Prop({ required: true })
  message: string

  @Prop({ type: Types.ObjectId, ref: "User" })
  userId?: Types.ObjectId

  @Prop({ default: false })
  isRead: boolean

  @Prop()
  response?: string

  @Prop()
  respondedAt?: Date
}

export const ContactSubmissionSchema = SchemaFactory.createForClass(ContactSubmission)
