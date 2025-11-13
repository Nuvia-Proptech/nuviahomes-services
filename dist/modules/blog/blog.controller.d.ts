import { BlogService } from "./blog.service";
import type { CreateBlogPostDto } from "./dto/create-blog-post.dto";
import type { CreateBlogCommentDto } from "./dto/create-blog-comment.dto";
export declare class BlogController {
    private readonly blogService;
    constructor(blogService: BlogService);
    createPost(createPostDto: CreateBlogPostDto, user: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/blog-post.schema").BlogPost, {}, {}> & import("./schemas/blog-post.schema").BlogPost & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getAllPublishedPosts(page?: number, limit?: number): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/blog-post.schema").BlogPost, {}, {}> & import("./schemas/blog-post.schema").BlogPost & Required<{
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
    searchPosts(query: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/blog-post.schema").BlogPost, {}, {}> & import("./schemas/blog-post.schema").BlogPost & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getPostsByTag(tag: string, page?: number, limit?: number): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/blog-post.schema").BlogPost, {}, {}> & import("./schemas/blog-post.schema").BlogPost & Required<{
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
    getPostBySlug(slug: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/blog-post.schema").BlogPost, {}, {}> & import("./schemas/blog-post.schema").BlogPost & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getPostById(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/blog-post.schema").BlogPost, {}, {}> & import("./schemas/blog-post.schema").BlogPost & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updatePost(id: string, updateDto: any, user: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/blog-post.schema").BlogPost, {}, {}> & import("./schemas/blog-post.schema").BlogPost & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    publishPost(id: string, user: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/blog-post.schema").BlogPost, {}, {}> & import("./schemas/blog-post.schema").BlogPost & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    deletePost(id: string, user: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/blog-post.schema").BlogPost, {}, {}> & import("./schemas/blog-post.schema").BlogPost & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getRelatedPosts(slug: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/blog-post.schema").BlogPost, {}, {}> & import("./schemas/blog-post.schema").BlogPost & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    likePost(id: string, user: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/blog-post.schema").BlogPost, {}, {}> & import("./schemas/blog-post.schema").BlogPost & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    createComment(postId: string, createCommentDto: CreateBlogCommentDto, user: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/blog-comment.schema").BlogComment, {}, {}> & import("./schemas/blog-comment.schema").BlogComment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getPostComments(postId: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/blog-comment.schema").BlogComment, {}, {}> & import("./schemas/blog-comment.schema").BlogComment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    deleteComment(commentId: string, user: any): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/blog-comment.schema").BlogComment, {}, {}> & import("./schemas/blog-comment.schema").BlogComment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    likeComment(commentId: string, user: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/blog-comment.schema").BlogComment, {}, {}> & import("./schemas/blog-comment.schema").BlogComment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getAuthorPosts(authorId: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/blog-post.schema").BlogPost, {}, {}> & import("./schemas/blog-post.schema").BlogPost & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
}
