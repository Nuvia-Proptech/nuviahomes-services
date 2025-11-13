import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"
import { UserRole } from "@/common/enums/user-role.enum"

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  firstName: string

  @Prop({ required: true })
  lastName: string

  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true })
  password: string

  @Prop({ required: true, enum: UserRole })
  role: UserRole

  @Prop()
  phone?: string

  @Prop()
  profileImage?: string

  @Prop()
  bio?: string

  @Prop()
  company?: string

  @Prop()
  website?: string

  @Prop({ type: Object })
  socialLinks?: {
    facebook?: string
    twitter?: string
    linkedin?: string
    instagram?: string
  }

  @Prop({ default: false })
  isVerified: boolean

  @Prop({ default: true })
  isActive: boolean

  @Prop()
  createdBy?: string

  @Prop()
  approvedBy?: string

  @Prop()
  approvalDate?: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
