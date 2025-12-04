import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"

@Schema({ timestamps: true })
export class Wallet extends Document {
  @Prop({ type: Types.ObjectId, ref: "User", required: true, unique: true })
  userId: Types.ObjectId

  @Prop({ required: true, default: 0, min: 0 })
  balance: number

  @Prop({ default: "USD" })
  currency: string

  @Prop({ default: true })
  isActive: boolean
}

export const WalletSchema = SchemaFactory.createForClass(Wallet)
