import { Controller, Get, Post, Param, Delete, UseGuards, Query, Patch } from "@nestjs/common"
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger"
import { BlogService } from "./blog.service"
import type { CreateBlogPostDto } from "./dto/create-blog-post.dto"
import type { CreateBlogCommentDto } from "./dto/create-blog-comment.dto"
import { JwtAuthGuard } from "@/modules/auth/guards/jwt-auth.guard"

@ApiTags("Blog")
@Controller("blog")
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  // Blog Posts
  @Post("posts")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async createPost(createPostDto: CreateBlogPostDto, user: any) {
    return this.blogService.createPost(createPostDto, user.id)
  }

  @Get("posts")
  async getAllPublishedPosts(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.blogService.getAllPublishedPosts(page, limit)
  }

  @Get('posts/search')
  async searchPosts(@Query('query') query: string) {
    return this.blogService.searchPosts(query);
  }

  @Get("posts/tag/:tag")
  async getPostsByTag(@Param('tag') tag: string, @Query('page') page?: number, @Query('limit') limit?: number) {
    return this.blogService.getPostsByTag(tag, page, limit)
  }

  @Get('posts/slug/:slug')
  async getPostBySlug(@Param('slug') slug: string) {
    return this.blogService.getPostBySlug(slug);
  }

  @Get('posts/:id')
  async getPostById(@Param('id') id: string) {
    return this.blogService.getPostById(id);
  }

  @Patch("posts/:id")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async updatePost(@Param('id') id: string, updateDto: any, user: any) {
    return this.blogService.updatePost(id, updateDto, user.id)
  }

  @Post("posts/:id/publish")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async publishPost(@Param('id') id: string, user: any) {
    return this.blogService.publishPost(id, user.id)
  }

  @Delete("posts/:id")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async deletePost(@Param('id') id: string, user: any) {
    return this.blogService.deletePost(id, user.id)
  }

  @Get('posts/:slug/related')
  async getRelatedPosts(@Param('slug') slug: string) {
    return this.blogService.getRelatedPosts(slug);
  }

  @Post("posts/:id/like")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async likePost(@Param('id') id: string, user: any) {
    return this.blogService.likePost(id, user.id)
  }

  // Blog Comments
  @Post("posts/:postId/comments")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async createComment(@Param('postId') postId: string, createCommentDto: CreateBlogCommentDto, user: any) {
    return this.blogService.createComment(postId, createCommentDto, user.id)
  }

  @Get('posts/:postId/comments')
  async getPostComments(@Param('postId') postId: string) {
    return this.blogService.getPostComments(postId);
  }

  @Delete("comments/:commentId")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async deleteComment(@Param('commentId') commentId: string, user: any) {
    return this.blogService.deleteComment(commentId, user.id)
  }

  @Post("comments/:commentId/like")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async likeComment(@Param('commentId') commentId: string, user: any) {
    return this.blogService.likeComment(commentId, user.id)
  }

  @Get('authors/:authorId')
  async getAuthorPosts(@Param('authorId') authorId: string) {
    return this.blogService.getAuthorPosts(authorId);
  }
}
