import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsOptional } from "class-validator"

export class CreateBlogCommentDto {
  @ApiProperty()
  @IsString()
  content: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  parentCommentId?: string
}
