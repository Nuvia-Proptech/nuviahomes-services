import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"

@Schema({ timestamps: true })
export class Review extends Document {
  @Prop({ type: Types.ObjectId, ref: "Property", required: true })
  propertyId: Types.ObjectId

  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  userId: Types.ObjectId

  @Prop({ required: true, min: 1, max: 5 })
  rating: number

  @Prop({ required: true })
  comment: string

  @Prop({ type: [String] })
  images?: string[]

  @Prop({ default: 0 })
  likes: number
}

export const ReviewSchema = SchemaFactory.createForClass(Review)
