import { Document, Types } from "mongoose";
export declare class BlogComment extends Document {
    postId: Types.ObjectId;
    userId: Types.ObjectId;
    content: string;
    parentCommentId?: Types.ObjectId;
    isApproved: boolean;
    likes: number;
    likedBy?: string[];
}
export declare const BlogCommentSchema: import("mongoose").Schema<BlogComment, import("mongoose").Model<BlogComment, any, any, any, Document<unknown, any, BlogComment, any, {}> & BlogComment & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BlogComment, Document<unknown, {}, import("mongoose").FlatRecord<BlogComment>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<BlogComment> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
