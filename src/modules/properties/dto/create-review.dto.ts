import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString, IsOptional, IsArray, Min, Max } from "class-validator"

export class CreateReviewDto {
  @ApiProperty({ minimum: 1, maximum: 5 })
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number

  @ApiProperty()
  @IsString()
  comment: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  images?: string[]
}
