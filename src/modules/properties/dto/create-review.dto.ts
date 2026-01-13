import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString, IsOptional, IsArray, Min, Max } from "class-validator"

export class CreateReviewDto {
  @ApiProperty({ 
    example: 5,
    description: "Rating from 1 to 5 stars",
    minimum: 1, 
    maximum: 5 
  })
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number

  @ApiProperty({ 
    example: "Absolutely loved this property! The location is perfect and the amenities are top-notch. The agent was very helpful throughout the process. Highly recommend!",
    description: "Review comment"
  })
  @IsString()
  comment: string

  @ApiProperty({ 
    example: [
      "https://example.com/review1-photo1.jpg",
      "https://example.com/review1-photo2.jpg"
    ],
    description: "Array of review image URLs",
    required: false
  })
  @IsOptional()
  @IsArray()
  images?: string[]
}
