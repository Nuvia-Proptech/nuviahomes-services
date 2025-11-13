import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"

export enum ProjectStatus {
  PLANNING = "planning",
  ACTIVE = "active",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

@Schema({ timestamps: true })
export class InvestmentProject extends Document {
  @Prop({ required: true })
  title: string

  @Prop({ required: true })
  description: string

  @Prop()
  imageUrl?: string

  @Prop({ required: true })
  minimumInvestment: number

  @Prop({ required: true })
  targetAmount: number

  @Prop({ default: 0 })
  raisedAmount: number

  @Prop({ required: true })
  expectedROI: number

  @Prop()
  investmentDuration?: string

  @Prop({ default: ProjectStatus.PLANNING, enum: ProjectStatus })
  status: ProjectStatus

  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  createdBy: Types.ObjectId

  @Prop()
  location?: string

  @Prop({ type: [String] })
  highlights?: string[]

  @Prop()
  completionDate?: Date

  @Prop({ default: 0 })
  investorCount: number

  @Prop({ default: true })
  isActive: boolean
}

export const InvestmentProjectSchema = SchemaFactory.createForClass(InvestmentProject)
