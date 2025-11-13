import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"

@Schema({ timestamps: true })
export class AgentProfile extends Document {
  @Prop({ type: Types.ObjectId, ref: "User", required: true, unique: true })
  userId: Types.ObjectId

  @Prop()
  specialization?: string

  @Prop()
  yearsOfExperience?: number

  @Prop()
  licenseNumber?: string

  @Prop()
  licenseExpiry?: Date

  @Prop({ type: [String] })
  certifications?: string[]

  @Prop({ type: Object })
  awards?: {
    title: string
    year: number
  }[]

  @Prop({ default: 0 })
  totalPropertiesListed: number

  @Prop({ default: 0 })
  totalPropertySales: number

  @Prop({ default: 0 })
  averageRating: number

  @Prop({ default: 0 })
  reviewCount: number

  @Prop()
  bankAccount?: string

  @Prop()
  commission?: number
}

export const AgentProfileSchema = SchemaFactory.createForClass(AgentProfile)
