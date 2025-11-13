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
exports.BlogController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const blog_service_1 = require("./blog.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let BlogController = class BlogController {
    blogService;
    constructor(blogService) {
        this.blogService = blogService;
    }
    async createPost(createPostDto, user) {
        return this.blogService.createPost(createPostDto, user.id);
    }
    async getAllPublishedPosts(page, limit) {
        return this.blogService.getAllPublishedPosts(page, limit);
    }
    async searchPosts(query) {
        return this.blogService.searchPosts(query);
    }
    async getPostsByTag(tag, page, limit) {
        return this.blogService.getPostsByTag(tag, page, limit);
    }
    async getPostBySlug(slug) {
        return this.blogService.getPostBySlug(slug);
    }
    async getPostById(id) {
        return this.blogService.getPostById(id);
    }
    async updatePost(id, updateDto, user) {
        return this.blogService.updatePost(id, updateDto, user.id);
    }
    async publishPost(id, user) {
        return this.blogService.publishPost(id, user.id);
    }
    async deletePost(id, user) {
        return this.blogService.deletePost(id, user.id);
    }
    async getRelatedPosts(slug) {
        return this.blogService.getRelatedPosts(slug);
    }
    async likePost(id, user) {
        return this.blogService.likePost(id, user.id);
    }
    async createComment(postId, createCommentDto, user) {
        return this.blogService.createComment(postId, createCommentDto, user.id);
    }
    async getPostComments(postId) {
        return this.blogService.getPostComments(postId);
    }
    async deleteComment(commentId, user) {
        return this.blogService.deleteComment(commentId, user.id);
    }
    async likeComment(commentId, user) {
        return this.blogService.likeComment(commentId, user.id);
    }
    async getAuthorPosts(authorId) {
        return this.blogService.getAuthorPosts(authorId);
    }
};
exports.BlogController = BlogController;
__decorate([
    (0, common_1.Post)("posts"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "createPost", null);
__decorate([
    (0, common_1.Get)("posts"),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getAllPublishedPosts", null);
__decorate([
    (0, common_1.Get)('posts/search'),
    __param(0, (0, common_1.Query)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "searchPosts", null);
__decorate([
    (0, common_1.Get)("posts/tag/:tag"),
    __param(0, (0, common_1.Param)('tag')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getPostsByTag", null);
__decorate([
    (0, common_1.Get)('posts/slug/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getPostBySlug", null);
__decorate([
    (0, common_1.Get)('posts/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getPostById", null);
__decorate([
    (0, common_1.Patch)("posts/:id"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "updatePost", null);
__decorate([
    (0, common_1.Post)("posts/:id/publish"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "publishPost", null);
__decorate([
    (0, common_1.Delete)("posts/:id"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "deletePost", null);
__decorate([
    (0, common_1.Get)('posts/:slug/related'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getRelatedPosts", null);
__decorate([
    (0, common_1.Post)("posts/:id/like"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "likePost", null);
__decorate([
    (0, common_1.Post)("posts/:postId/comments"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "createComment", null);
__decorate([
    (0, common_1.Get)('posts/:postId/comments'),
    __param(0, (0, common_1.Param)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getPostComments", null);
__decorate([
    (0, common_1.Delete)("comments/:commentId"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('commentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "deleteComment", null);
__decorate([
    (0, common_1.Post)("comments/:commentId/like"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('commentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "likeComment", null);
__decorate([
    (0, common_1.Get)('authors/:authorId'),
    __param(0, (0, common_1.Param)('authorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getAuthorPosts", null);
exports.BlogController = BlogController = __decorate([
    (0, swagger_1.ApiTags)("Blog"),
    (0, common_1.Controller)("blog"),
    __metadata("design:paramtypes", [blog_service_1.BlogService])
], BlogController);
//# sourceMappingURL=blog.controller.js.map