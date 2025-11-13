import { Document, Types } from "mongoose";
export declare class BlogPost extends Document {
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    featuredImage?: string;
    authorId: Types.ObjectId;
    tags?: string[];
    category?: string;
    isPublished: boolean;
    publishedAt?: Date;
    views: number;
    likes: number;
    likedBy?: string[];
    isActive: boolean;
}
export declare const BlogPostSchema: import("mongoose").Schema<BlogPost, import("mongoose").Model<BlogPost, any, any, any, Document<unknown, any, BlogPost, any, {}> & BlogPost & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BlogPost, Document<unknown, {}, import("mongoose").FlatRecord<BlogPost>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<BlogPost> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
