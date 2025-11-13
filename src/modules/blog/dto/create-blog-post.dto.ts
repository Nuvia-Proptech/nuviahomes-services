import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsOptional, IsArray } from "class-validator"

export class CreateBlogPostDto {
  @ApiProperty()
  @IsString()
  title: string

  @ApiProperty()
  @IsString()
  content: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  excerpt?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  featuredImage?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  tags?: string[]

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  category?: string
}
