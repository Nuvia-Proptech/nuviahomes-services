import { Document, Types } from "mongoose";
import { TransactionType } from "@/common/enums/transaction-type.enum";
import { TransactionStatus } from "@/common/enums/transaction-status.enum";
export declare class Transaction extends Document {
    walletId: Types.ObjectId;
    userId: Types.ObjectId;
    type: TransactionType;
    amount: number;
    status: TransactionStatus;
    description?: string;
    reference?: string;
    recipientWalletId?: Types.ObjectId;
    balanceBefore: number;
    balanceAfter: number;
    metadata?: Record<string, any>;
}
export declare const TransactionSchema: import("mongoose").Schema<Transaction, import("mongoose").Model<Transaction, any, any, any, Document<unknown, any, Transaction, any, {}> & Transaction & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Transaction, Document<unknown, {}, import("mongoose").FlatRecord<Transaction>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Transaction> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
