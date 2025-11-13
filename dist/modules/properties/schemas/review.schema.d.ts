import { Document, Types } from "mongoose";
export declare class Review extends Document {
    propertyId: Types.ObjectId;
    userId: Types.ObjectId;
    rating: number;
    comment: string;
    images?: string[];
    likes: number;
}
export declare const ReviewSchema: import("mongoose").Schema<Review, import("mongoose").Model<Review, any, any, any, Document<unknown, any, Review, any, {}> & Review & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Review, Document<unknown, {}, import("mongoose").FlatRecord<Review>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Review> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
