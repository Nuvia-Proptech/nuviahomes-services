"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const blog_post_schema_1 = require("./schemas/blog-post.schema");
const blog_comment_schema_1 = require("./schemas/blog-comment.schema");
let BlogService = class BlogService {
    blogPostModel;
    blogCommentModel;
    constructor(blogPostModel, blogCommentModel) {
        this.blogPostModel = blogPostModel;
        this.blogCommentModel = blogCommentModel;
    }
    generateSlug(title) {
        return title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_]+/g, "-")
            .replace(/^-+|-+$/g, "");
    }
    async createPost(createPostDto, authorId) {
        const slug = this.generateSlug(createPostDto.title);
        const existingPost = await this.blogPostModel.findOne({ slug });
        if (existingPost) {
            throw new common_1.BadRequestException("A post with this title already exists");
        }
        const post = new this.blogPostModel({
            ...createPostDto,
            slug,
            authorId,
            isPublished: false,
        });
        return post.save();
    }
    async getAllPublishedPosts(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const total = await this.blogPostModel.countDocuments({ isPublished: true, isActive: true });
        const posts = await this.blogPostModel
            .find({ isPublished: true, isActive: true })
            .populate("authorId", "firstName lastName profileImage")
            .skip(skip)
            .limit(limit)
            .sort({ publishedAt: -1 });
        return {
            data: posts,
            pagination: { total, page, limit, pages: Math.ceil(total / limit) },
        };
    }
    async getPostBySlug(slug) {
        const post = await this.blogPostModel
            .findOneAndUpdate({ slug, isPublished: true }, { $inc: { views: 1 } }, { new: true })
            .populate("authorId", "firstName lastName profileImage company email");
        if (!post) {
            throw new common_1.NotFoundException("Blog post not found");
        }
        return post;
    }
    async getPostById(id) {
        const post = await this.blogPostModel.findById(id).populate("authorId", "firstName lastName profileImage");
        if (!post) {
            throw new common_1.NotFoundException("Blog post not found");
        }
        return post;
    }
    async updatePost(id, updateDto, authorId) {
        const post = await this.blogPostModel.findById(id);
        if (!post) {
            throw new common_1.NotFoundException("Blog post not found");
        }
        if (post.authorId.toString() !== authorId) {
            throw new common_1.ForbiddenException("You can only update your own posts");
        }
        if (updateDto.title && updateDto.title !== post.title) {
            updateDto.slug = this.generateSlug(updateDto.title);
        }
        Object.assign(post, updateDto);
        return post.save();
    }
    async publishPost(id, authorId) {
        const post = await this.blogPostModel.findById(id);
        if (!post) {
            throw new common_1.NotFoundException("Blog post not found");
        }
        if (post.authorId.toString() !== authorId) {
            throw new common_1.ForbiddenException("You can only publish your own posts");
        }
        post.isPublished = true;
        post.publishedAt = new Date();
        return post.save();
    }
    async deletePost(id, authorId) {
        const post = await this.blogPostModel.findById(id);
        if (!post) {
            throw new common_1.NotFoundException("Blog post not found");
        }
        if (post.authorId.toString() !== authorId) {
            throw new common_1.ForbiddenException("You can only delete your own posts");
        }
        post.isActive = false;
        return post.save();
    }
    async getRelatedPosts(slug, limit = 3) {
        const post = await this.blogPostModel.findOne({ slug });
        if (!post) {
            throw new common_1.NotFoundException("Blog post not found");
        }
        return this.blogPostModel
            .find({
            _id: { $ne: post._id },
            tags: { $in: post.tags || [] },
            isPublished: true,
            isActive: true,
        })
            .limit(limit)
            .populate("authorId", "firstName lastName");
    }
    async searchPosts(query) {
        return this.blogPostModel
            .find({
            isPublished: true,
            isActive: true,
            $or: [
                { title: { $regex: query, $options: "i" } },
                { content: { $regex: query, $options: "i" } },
                { tags: { $regex: query, $options: "i" } },
            ],
        })
            .populate("authorId", "firstName lastName")
            .sort({ publishedAt: -1 });
    }
    async getPostsByTag(tag, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const total = await this.blogPostModel.countDocuments({
            tags: tag,
            isPublished: true,
            isActive: true,
        });
        const posts = await this.blogPostModel
            .find({
            tags: tag,
            isPublished: true,
            isActive: true,
        })
            .populate("authorId", "firstName lastName")
            .skip(skip)
            .limit(limit)
            .sort({ publishedAt: -1 });
        return {
            data: posts,
            pagination: { total, page, limit, pages: Math.ceil(total / limit) },
        };
    }
    async likePost(postId, userId) {
        const post = await this.blogPostModel.findById(postId);
        if (!post) {
            throw new common_1.NotFoundException("Blog post not found");
        }
        if (!post.likedBy)
            post.likedBy = [];
        if (post.likedBy.includes(userId)) {
            post.likedBy = post.likedBy.filter((id) => id !== userId);
            post.likes = Math.max(0, post.likes - 1);
        }
        else {
            post.likedBy.push(userId);
            post.likes += 1;
        }
        return post.save();
    }
    async createComment(postId, createCommentDto, userId) {
        const post = await this.blogPostModel.findById(postId);
        if (!post) {
            throw new common_1.NotFoundException("Blog post not found");
        }
        const comment = new this.blogCommentModel({
            postId,
            userId,
            ...createCommentDto,
            isApproved: true,
        });
        return comment.save();
    }
    async getPostComments(postId) {
        return this.blogCommentModel
            .find({ postId, isApproved: true })
            .populate("userId", "firstName lastName profileImage")
            .populate("parentCommentId")
            .sort({ createdAt: -1 });
    }
    async deleteComment(commentId, userId) {
        const comment = await this.blogCommentModel.findById(commentId);
        if (!comment) {
            throw new common_1.NotFoundException("Comment not found");
        }
        if (comment.userId.toString() !== userId) {
            throw new common_1.ForbiddenException("You can only delete your own comments");
        }
        return this.blogCommentModel.findByIdAndDelete(commentId);
    }
    async likeComment(commentId, userId) {
        const comment = await this.blogCommentModel.findById(commentId);
        if (!comment) {
            throw new common_1.NotFoundException("Comment not found");
        }
        if (!comment.likedBy)
            comment.likedBy = [];
        if (comment.likedBy.includes(userId)) {
            comment.likedBy = comment.likedBy.filter((id) => id !== userId);
            comment.likes = Math.max(0, comment.likes - 1);
        }
        else {
            comment.likedBy.push(userId);
            comment.likes += 1;
        }
        return comment.save();
    }
    async getAuthorPosts(authorId) {
        return this.blogPostModel.find({ authorId }).sort({ createdAt: -1 });
    }
};
exports.BlogService = BlogService;
exports.BlogService = BlogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(blog_post_schema_1.BlogPost.name)),
    __param(1, (0, mongoose_1.InjectModel)(blog_comment_schema_1.BlogComment.name)),
    __metadata("design:paramtypes", [Function, Function])
], BlogService);
//# sourceMappingURL=blog.service.js.map