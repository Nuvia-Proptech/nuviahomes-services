import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { BlogService } from "./blog.service"
import { BlogController } from "./blog.controller"
import { BlogPost, BlogPostSchema } from "./schemas/blog-post.schema"
import { BlogComment, BlogCommentSchema } from "./schemas/blog-comment.schema"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BlogPost.name, schema: BlogPostSchema },
      { name: BlogComment.name, schema: BlogCommentSchema },
    ]),
  ],
  controllers: [BlogController],
  providers: [BlogService],
  exports: [BlogService],
})
export class BlogModule {}
