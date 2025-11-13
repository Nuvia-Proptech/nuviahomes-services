import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"

export enum InvestmentType {
  PROPERTY = "property",
  PROJECT = "project",
}

export enum InvestmentStatus {
  PENDING = "pending",
  ACTIVE = "active",
  COMPLETED = "completed",
  WITHDRAWN = "withdrawn",
}

@Schema({ timestamps: true })
export class Investment extends Document {
  @Prop({ required: true, enum: InvestmentType })
  investmentType: InvestmentType

  @Prop({ type: Types.ObjectId, ref: "Property" })
  propertyId?: Types.ObjectId

  @Prop({ type: Types.ObjectId, ref: "InvestmentProject" })
  projectId?: Types.ObjectId

  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  investorId: Types.ObjectId

  @Prop({ required: true })
  amount: number

  @Prop()
  shares?: number

  @Prop({ default: InvestmentStatus.PENDING, enum: InvestmentStatus })
  status: InvestmentStatus

  @Prop()
  expectedReturn?: number

  @Prop()
  expectedReturnDate?: Date

  @Prop()
  actualReturn?: number

  @Prop()
  actualReturnDate?: Date

  @Prop()
  documents?: string[]

  @Prop()
  notes?: string
}

export const InvestmentSchema = SchemaFactory.createForClass(Investment)
