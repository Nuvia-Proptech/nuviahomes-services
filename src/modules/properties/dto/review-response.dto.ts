import { ApiProperty } from "@nestjs/swagger"

export class ReviewUserDto {
  @ApiProperty({ 
    example: "507f1f77bcf86cd799439011",
    description: "User's unique identifier"
  })
  _id: string

  @ApiProperty({ 
    example: "John",
    description: "User's first name"
  })
  firstName: string

  @ApiProperty({ 
    example: "Doe",
    description: "User's last name"
  })
  lastName: string

  @ApiProperty({ 
    example: "https://example.com/profile.jpg",
    description: "User's profile image URL",
    required: false
  })
  profileImage?: string
}

export class ReviewResponseDto {
  @ApiProperty({ 
    example: "507f1f77bcf86cd799439015",
    description: "Review's unique identifier"
  })
  _id: string

  @ApiProperty({ 
    example: "507f1f77bcf86cd799439013",
    description: "Property ID this review belongs to"
  })
  propertyId: string

  @ApiProperty({ 
    type: ReviewUserDto,
    description: "User who wrote the review"
  })
  user: ReviewUserDto

  @ApiProperty({ 
    example: 5,
    description: "Rating from 1 to 5 stars",
    minimum: 1,
    maximum: 5
  })
  rating: number

  @ApiProperty({ 
    example: "Absolutely loved this property! The location is perfect and the amenities are top-notch. The agent was very helpful throughout the process. Highly recommend!",
    description: "Review comment"
  })
  comment: string

  @ApiProperty({ 
    example: [
      "https://example.com/review1-photo1.jpg",
      "https://example.com/review1-photo2.jpg"
    ],
    description: "Array of review image URLs",
    required: false
  })
  images?: string[]

  @ApiProperty({ 
    example: 12,
    description: "Number of likes on this review"
  })
  likes: number

  @ApiProperty({ 
    example: "2024-01-18T16:30:00.000Z",
    description: "Review creation timestamp"
  })
  createdAt: string

  @ApiProperty({ 
    example: "2024-01-18T16:30:00.000Z",
    description: "Last update timestamp"
  })
  updatedAt: string
}

export class PropertyReviewsResponseDto {
  @ApiProperty({ 
    type: [ReviewResponseDto],
    description: "Array of property reviews"
  })
  reviews: ReviewResponseDto[]

  @ApiProperty({ 
    example: 4.6,
    description: "Average rating for the property"
  })
  averageRating: number

  @ApiProperty({ 
    example: 23,
    description: "Total number of reviews"
  })
  totalReviews: number
}

export class AverageRatingResponseDto {
  @ApiProperty({ 
    example: "507f1f77bcf86cd799439013",
    description: "Property ID"
  })
  propertyId: string

  @ApiProperty({ 
    example: 4.6,
    description: "Average rating (1-5 stars)"
  })
  averageRating: number

  @ApiProperty({ 
    example: 23,
    description: "Total number of reviews"
  })
  totalReviews: number

  @ApiProperty({ 
    example: {
      "5": 12,
      "4": 8,
      "3": 2,
      "2": 1,
      "1": 0
    },
    description: "Rating distribution breakdown"
  })
  ratingDistribution: Record<string, number>
}