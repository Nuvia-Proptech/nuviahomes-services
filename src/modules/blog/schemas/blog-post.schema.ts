import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"

@Schema({ timestamps: true })
export class BlogPost extends Document {
  @Prop({ required: true })
  title: string

  @Prop({ required: true })
  slug: string

  @Prop({ required: true })
  content: string

  @Prop()
  excerpt?: string

  @Prop()
  featuredImage?: string

  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  authorId: Types.ObjectId

  @Prop({ type: [String] })
  tags?: string[]

  @Prop()
  category?: string

  @Prop({ default: false })
  isPublished: boolean

  @Prop()
  publishedAt?: Date

  @Prop({ default: 0 })
  views: number

  @Prop({ default: 0 })
  likes: number

  @Prop({ type: [String] })
  likedBy?: string[]

  @Prop({ default: true })
  isActive: boolean
}

export const BlogPostSchema = SchemaFactory.createForClass(BlogPost)
