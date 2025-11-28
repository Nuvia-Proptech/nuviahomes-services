import { Controller, Get, Post, Param, Delete, UseGuards, Query, Patch, Body } from "@nestjs/common"
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam, ApiQuery } from "@nestjs/swagger"
import { BlogService } from "./blog.service"
import type { CreateBlogPostDto } from "./dto/create-blog-post.dto"
import type { CreateBlogCommentDto } from "./dto/create-blog-comment.dto"
import { JwtAuthGuard } from "@/modules/auth/guards/jwt-auth.guard"
import { CurrentUser } from "@/modules/auth/decorators/current-user.decorator"

@ApiTags("Blog")
@Controller("blog")
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  // Blog Posts
  @Post("posts")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Create a new blog post" })
  @ApiResponse({ status: 201, description: "Blog post created successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async createPost(@Body() createPostDto: CreateBlogPostDto, @CurrentUser() user: any) {
    return this.blogService.createPost(createPostDto, user.id)
  }

  @Get("posts")
  @ApiOperation({ summary: "Get all published blog posts" })
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiResponse({ status: 200, description: "Returns list of published posts" })
  async getAllPublishedPosts(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.blogService.getAllPublishedPosts(page, limit)
  }

  @Get('posts/search')
  @ApiOperation({ summary: "Search blog posts" })
  @ApiQuery({ name: "query", required: true, description: "Search query" })
  @ApiResponse({ status: 200, description: "Returns search results" })
  async searchPosts(@Query('query') query: string) {
    return this.blogService.searchPosts(query);
  }

  @Get("posts/tag/:tag")
  @ApiOperation({ summary: "Get posts by tag" })
  @ApiParam({ name: "tag", description: "Tag name" })
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiResponse({ status: 200, description: "Returns posts with specified tag" })
  async getPostsByTag(@Param('tag') tag: string, @Query('page') page?: number, @Query('limit') limit?: number) {
    return this.blogService.getPostsByTag(tag, page, limit)
  }

  @Get('posts/slug/:slug')
  @ApiOperation({ summary: "Get post by slug" })
  @ApiParam({ name: "slug", description: "Post slug" })
  @ApiResponse({ status: 200, description: "Returns blog post" })
  @ApiResponse({ status: 404, description: "Post not found" })
  async getPostBySlug(@Param('slug') slug: string) {
    return this.blogService.getPostBySlug(slug);
  }

  @Get('posts/:id')
  @ApiOperation({ summary: "Get post by ID" })
  @ApiParam({ name: "id", description: "Post ID" })
  @ApiResponse({ status: 200, description: "Returns blog post" })
  @ApiResponse({ status: 404, description: "Post not found" })
  async getPostById(@Param('id') id: string) {
    return this.blogService.getPostById(id);
  }

  @Patch("posts/:id")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Update blog post" })
  @ApiParam({ name: "id", description: "Post ID" })
  @ApiResponse({ status: 200, description: "Post updated successfully" })
  async updatePost(@Param('id') id: string, @Body() updateDto: any, @CurrentUser() user: any) {
    return this.blogService.updatePost(id, updateDto, user.id)
  }

  @Post("posts/:id/publish")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Publish blog post" })
  @ApiParam({ name: "id", description: "Post ID" })
  @ApiResponse({ status: 200, description: "Post published successfully" })
  async publishPost(@Param('id') id: string, @CurrentUser() user: any) {
    return this.blogService.publishPost(id, user.id)
  }

  @Delete("posts/:id")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Delete blog post" })
  @ApiParam({ name: "id", description: "Post ID" })
  @ApiResponse({ status: 200, description: "Post deleted successfully" })
  async deletePost(@Param('id') id: string, @CurrentUser() user: any) {
    return this.blogService.deletePost(id, user.id)
  }

  @Get('posts/:slug/related')
  @ApiOperation({ summary: "Get related posts" })
  @ApiParam({ name: "slug", description: "Post slug" })
  @ApiResponse({ status: 200, description: "Returns related posts" })
  async getRelatedPosts(@Param('slug') slug: string) {
    return this.blogService.getRelatedPosts(slug);
  }

  @Post("posts/:id/like")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Like a blog post" })
  @ApiParam({ name: "id", description: "Post ID" })
  @ApiResponse({ status: 200, description: "Post liked successfully" })
  async likePost(@Param('id') id: string, @CurrentUser() user: any) {
    return this.blogService.likePost(id, user.id)
  }

  // Blog Comments
  @Post("posts/:postId/comments")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Create a comment on a blog post" })
  @ApiParam({ name: "postId", description: "Post ID" })
  @ApiResponse({ status: 201, description: "Comment created successfully" })
  async createComment(@Param('postId') postId: string, @Body() createCommentDto: CreateBlogCommentDto, @CurrentUser() user: any) {
    return this.blogService.createComment(postId, createCommentDto, user.id)
  }

  @Get('posts/:postId/comments')
  @ApiOperation({ summary: "Get all comments for a post" })
  @ApiParam({ name: "postId", description: "Post ID" })
  @ApiResponse({ status: 200, description: "Returns post comments" })
  async getPostComments(@Param('postId') postId: string) {
    return this.blogService.getPostComments(postId);
  }

  @Delete("comments/:commentId")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Delete a comment" })
  @ApiParam({ name: "commentId", description: "Comment ID" })
  @ApiResponse({ status: 200, description: "Comment deleted successfully" })
  async deleteComment(@Param('commentId') commentId: string, @CurrentUser() user: any) {
    return this.blogService.deleteComment(commentId, user.id)
  }

  @Post("comments/:commentId/like")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Like a comment" })
  @ApiParam({ name: "commentId", description: "Comment ID" })
  @ApiResponse({ status: 200, description: "Comment liked successfully" })
  async likeComment(@Param('commentId') commentId: string, @CurrentUser() user: any) {
    return this.blogService.likeComment(commentId, user.id)
  }

  @Get('authors/:authorId')
  @ApiOperation({ summary: "Get posts by author" })
  @ApiParam({ name: "authorId", description: "Author ID" })
  @ApiResponse({ status: 200, description: "Returns author's posts" })
  async getAuthorPosts(@Param('authorId') authorId: string) {
    return this.blogService.getAuthorPosts(authorId);
  }
}
