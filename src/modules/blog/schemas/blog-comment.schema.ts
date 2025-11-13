import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"

@Schema({ timestamps: true })
export class BlogComment extends Document {
  @Prop({ type: Types.ObjectId, ref: "BlogPost", required: true })
  postId: Types.ObjectId

  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  userId: Types.ObjectId

  @Prop({ required: true })
  content: string

  @Prop({ type: Types.ObjectId, ref: "BlogComment" })
  parentCommentId?: Types.ObjectId

  @Prop({ default: false })
  isApproved: boolean

  @Prop({ default: 0 })
  likes: number

  @Prop({ type: [String] })
  likedBy?: string[]
}

export const BlogCommentSchema = SchemaFactory.createForClass(BlogComment)
