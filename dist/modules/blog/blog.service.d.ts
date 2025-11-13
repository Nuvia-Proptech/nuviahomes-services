import type { Model } from "mongoose";
import { BlogPost } from "./schemas/blog-post.schema";
import { BlogComment } from "./schemas/blog-comment.schema";
import type { CreateBlogPostDto } from "./dto/create-blog-post.dto";
import type { CreateBlogCommentDto } from "./dto/create-blog-comment.dto";
export declare class BlogService {
    private readonly blogPostModel;
    private readonly blogCommentModel;
    constructor(blogPostModel: Model<BlogPost>, blogCommentModel: Model<BlogComment>);
    private generateSlug;
    createPost(createPostDto: CreateBlogPostDto, authorId: string): Promise<import("mongoose").Document<unknown, {}, BlogPost, {}, {}> & BlogPost & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getAllPublishedPosts(page?: number, limit?: number): Promise<{
        data: (import("mongoose").Document<unknown, {}, BlogPost, {}, {}> & BlogPost & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            pages: number;
        };
    }>;
    getPostBySlug(slug: string): Promise<import("mongoose").Document<unknown, {}, BlogPost, {}, {}> & BlogPost & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getPostById(id: string): Promise<import("mongoose").Document<unknown, {}, BlogPost, {}, {}> & BlogPost & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updatePost(id: string, updateDto: any, authorId: string): Promise<import("mongoose").Document<unknown, {}, BlogPost, {}, {}> & BlogPost & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    publishPost(id: string, authorId: string): Promise<import("mongoose").Document<unknown, {}, BlogPost, {}, {}> & BlogPost & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    deletePost(id: string, authorId: string): Promise<import("mongoose").Document<unknown, {}, BlogPost, {}, {}> & BlogPost & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getRelatedPosts(slug: string, limit?: number): Promise<(import("mongoose").Document<unknown, {}, BlogPost, {}, {}> & BlogPost & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    searchPosts(query: string): Promise<(import("mongoose").Document<unknown, {}, BlogPost, {}, {}> & BlogPost & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getPostsByTag(tag: string, page?: number, limit?: number): Promise<{
        data: (import("mongoose").Document<unknown, {}, BlogPost, {}, {}> & BlogPost & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            pages: number;
        };
    }>;
    likePost(postId: string, userId: string): Promise<import("mongoose").Document<unknown, {}, BlogPost, {}, {}> & BlogPost & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    createComment(postId: string, createCommentDto: CreateBlogCommentDto, userId: string): Promise<import("mongoose").Document<unknown, {}, BlogComment, {}, {}> & BlogComment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getPostComments(postId: string): Promise<(import("mongoose").Document<unknown, {}, BlogComment, {}, {}> & BlogComment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    deleteComment(commentId: string, userId: string): Promise<(import("mongoose").Document<unknown, {}, BlogComment, {}, {}> & BlogComment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    likeComment(commentId: string, userId: string): Promise<import("mongoose").Document<unknown, {}, BlogComment, {}, {}> & BlogComment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getAuthorPosts(authorId: string): Promise<(import("mongoose").Document<unknown, {}, BlogPost, {}, {}> & BlogPost & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
}
