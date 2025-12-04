import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"
import { TransactionType } from "@/common/enums/transaction-type.enum"
import { TransactionStatus } from "@/common/enums/transaction-status.enum"

@Schema({ timestamps: true })
export class Transaction extends Document {
  @Prop({ type: Types.ObjectId, ref: "Wallet", required: true })
  walletId: Types.ObjectId

  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  userId: Types.ObjectId

  @Prop({ required: true, enum: TransactionType })
  type: TransactionType

  @Prop({ required: true })
  amount: number

  @Prop({ required: true, enum: TransactionStatus, default: TransactionStatus.PENDING })
  status: TransactionStatus

  @Prop()
  description?: string

  @Prop()
  reference?: string

  @Prop({ type: Types.ObjectId, ref: "Wallet" })
  recipientWalletId?: Types.ObjectId

  @Prop()
  balanceBefore: number

  @Prop()
  balanceAfter: number

  @Prop({ type: Object })
  metadata?: Record<string, any>
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction)
