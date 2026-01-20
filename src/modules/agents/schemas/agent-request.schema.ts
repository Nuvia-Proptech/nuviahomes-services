import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"

@Schema({ timestamps: true })
export class AgentRequest extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId

  @Prop({ required: true })
  reason: string

  @Prop()
  company?: string

  @Prop()
  website?: string

  @Prop()
  bio?: string

  @Prop()
  licenseNumber?: string

  @Prop({ 
    required: true, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  })
  status: 'pending' | 'approved' | 'rejected'

  @Prop()
  adminComments?: string

  @Prop({ type: Types.ObjectId, ref: 'User' })
  approvedBy?: Types.ObjectId

  @Prop()
  approvalDate?: Date
}

export const AgentRequestSchema = SchemaFactory.createForClass(AgentRequest)