export declare class ReviewUserDto {
    _id: string;
    firstName: string;
    lastName: string;
    profileImage?: string;
}
export declare class ReviewResponseDto {
    _id: string;
    propertyId: string;
    user: ReviewUserDto;
    rating: number;
    comment: string;
    images?: string[];
    likes: number;
    createdAt: string;
    updatedAt: string;
}
export declare class PropertyReviewsResponseDto {
    reviews: ReviewResponseDto[];
    averageRating: number;
    totalReviews: number;
}
export declare class AverageRatingResponseDto {
    propertyId: string;
    averageRating: number;
    totalReviews: number;
    ratingDistribution: Record<string, number>;
}
