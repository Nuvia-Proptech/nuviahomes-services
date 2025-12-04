import { Document, Types } from "mongoose";
export declare class Wallet extends Document {
    userId: Types.ObjectId;
    balance: number;
    currency: string;
    isActive: boolean;
}
export declare const WalletSchema: import("mongoose").Schema<Wallet, import("mongoose").Model<Wallet, any, any, any, Document<unknown, any, Wallet, any, {}> & Wallet & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Wallet, Document<unknown, {}, import("mongoose").FlatRecord<Wallet>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Wallet> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
