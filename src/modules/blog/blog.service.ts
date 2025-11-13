import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import type { Model } from "mongoose"
import { BlogPost } from "./schemas/blog-post.schema"
import { BlogComment } from "./schemas/blog-comment.schema"
import type { CreateBlogPostDto } from "./dto/create-blog-post.dto"
import type { CreateBlogCommentDto } from "./dto/create-blog-comment.dto"

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(BlogPost.name) private readonly blogPostModel: Model<BlogPost>,
    @InjectModel(BlogComment.name) private readonly blogCommentModel: Model<BlogComment>,
  ) {}

  // Helper function to generate slug
  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_]+/g, "-")
      .replace(/^-+|-+$/g, "")
  }

  // Blog Posts
  async createPost(createPostDto: CreateBlogPostDto, authorId: string) {
    const slug = this.generateSlug(createPostDto.title)

    const existingPost = await this.blogPostModel.findOne({ slug })
    if (existingPost) {
      throw new BadRequestException("A post with this title already exists")
    }

    const post = new this.blogPostModel({
      ...createPostDto,
      slug,
      authorId,
      isPublished: false,
    })

    return post.save()
  }

  async getAllPublishedPosts(page = 1, limit = 10) {
    const skip = (page - 1) * limit
    const total = await this.blogPostModel.countDocuments({ isPublished: true, isActive: true })
    const posts = await this.blogPostModel
      .find({ isPublished: true, isActive: true })
      .populate("authorId", "firstName lastName profileImage")
      .skip(skip)
      .limit(limit)
      .sort({ publishedAt: -1 })

    return {
      data: posts,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
    }
  }

  async getPostBySlug(slug: string) {
    const post = await this.blogPostModel
      .findOneAndUpdate({ slug, isPublished: true }, { $inc: { views: 1 } }, { new: true })
      .populate("authorId", "firstName lastName profileImage company email")

    if (!post) {
      throw new NotFoundException("Blog post not found")
    }

    return post
  }

  async getPostById(id: string) {
    const post = await this.blogPostModel.findById(id).populate("authorId", "firstName lastName profileImage")

    if (!post) {
      throw new NotFoundException("Blog post not found")
    }

    return post
  }

  async updatePost(id: string, updateDto: any, authorId: string) {
    const post = await this.blogPostModel.findById(id)
    if (!post) {
      throw new NotFoundException("Blog post not found")
    }

    if (post.authorId.toString() !== authorId) {
      throw new ForbiddenException("You can only update your own posts")
    }

    if (updateDto.title && updateDto.title !== post.title) {
      updateDto.slug = this.generateSlug(updateDto.title)
    }

    Object.assign(post, updateDto)
    return post.save()
  }

  async publishPost(id: string, authorId: string) {
    const post = await this.blogPostModel.findById(id)
    if (!post) {
      throw new NotFoundException("Blog post not found")
    }

    if (post.authorId.toString() !== authorId) {
      throw new ForbiddenException("You can only publish your own posts")
    }

    post.isPublished = true
    post.publishedAt = new Date()
    return post.save()
  }

  async deletePost(id: string, authorId: string) {
    const post = await this.blogPostModel.findById(id)
    if (!post) {
      throw new NotFoundException("Blog post not found")
    }

    if (post.authorId.toString() !== authorId) {
      throw new ForbiddenException("You can only delete your own posts")
    }

    post.isActive = false
    return post.save()
  }

  async getRelatedPosts(slug: string, limit = 3) {
    const post = await this.blogPostModel.findOne({ slug })
    if (!post) {
      throw new NotFoundException("Blog post not found")
    }

    return this.blogPostModel
      .find({
        _id: { $ne: post._id },
        tags: { $in: post.tags || [] },
        isPublished: true,
        isActive: true,
      })
      .limit(limit)
      .populate("authorId", "firstName lastName")
  }

  async searchPosts(query: string) {
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
      .sort({ publishedAt: -1 })
  }

  async getPostsByTag(tag: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit
    const total = await this.blogPostModel.countDocuments({
      tags: tag,
      isPublished: true,
      isActive: true,
    })

    const posts = await this.blogPostModel
      .find({
        tags: tag,
        isPublished: true,
        isActive: true,
      })
      .populate("authorId", "firstName lastName")
      .skip(skip)
      .limit(limit)
      .sort({ publishedAt: -1 })

    return {
      data: posts,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
    }
  }

  async likePost(postId: string, userId: string) {
    const post = await this.blogPostModel.findById(postId)
    if (!post) {
      throw new NotFoundException("Blog post not found")
    }

    if (!post.likedBy) post.likedBy = []

    if (post.likedBy.includes(userId)) {
      post.likedBy = post.likedBy.filter((id) => id !== userId)
      post.likes = Math.max(0, post.likes - 1)
    } else {
      post.likedBy.push(userId)
      post.likes += 1
    }

    return post.save()
  }

  // Blog Comments
  async createComment(postId: string, createCommentDto: CreateBlogCommentDto, userId: string) {
    const post = await this.blogPostModel.findById(postId)
    if (!post) {
      throw new NotFoundException("Blog post not found")
    }

    const comment = new this.blogCommentModel({
      postId,
      userId,
      ...createCommentDto,
      isApproved: true,
    })

    return comment.save()
  }

  async getPostComments(postId: string) {
    return this.blogCommentModel
      .find({ postId, isApproved: true })
      .populate("userId", "firstName lastName profileImage")
      .populate("parentCommentId")
      .sort({ createdAt: -1 })
  }

  async deleteComment(commentId: string, userId: string) {
    const comment = await this.blogCommentModel.findById(commentId)
    if (!comment) {
      throw new NotFoundException("Comment not found")
    }

    if (comment.userId.toString() !== userId) {
      throw new ForbiddenException("You can only delete your own comments")
    }

    return this.blogCommentModel.findByIdAndDelete(commentId)
  }

  async likeComment(commentId: string, userId: string) {
    const comment = await this.blogCommentModel.findById(commentId)
    if (!comment) {
      throw new NotFoundException("Comment not found")
    }

    if (!comment.likedBy) comment.likedBy = []

    if (comment.likedBy.includes(userId)) {
      comment.likedBy = comment.likedBy.filter((id) => id !== userId)
      comment.likes = Math.max(0, comment.likes - 1)
    } else {
      comment.likedBy.push(userId)
      comment.likes += 1
    }

    return comment.save()
  }

  async getAuthorPosts(authorId: string) {
    return this.blogPostModel.find({ authorId }).sort({ createdAt: -1 })
  }
}
