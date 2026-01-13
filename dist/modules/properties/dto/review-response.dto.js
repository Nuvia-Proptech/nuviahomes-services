"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AverageRatingResponseDto = exports.PropertyReviewsResponseDto = exports.ReviewResponseDto = exports.ReviewUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ReviewUserDto {
    _id;
    firstName;
    lastName;
    profileImage;
}
exports.ReviewUserDto = ReviewUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "507f1f77bcf86cd799439011",
        description: "User's unique identifier"
    }),
    __metadata("design:type", String)
], ReviewUserDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "John",
        description: "User's first name"
    }),
    __metadata("design:type", String)
], ReviewUserDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Doe",
        description: "User's last name"
    }),
    __metadata("design:type", String)
], ReviewUserDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "https://example.com/profile.jpg",
        description: "User's profile image URL",
        required: false
    }),
    __metadata("design:type", String)
], ReviewUserDto.prototype, "profileImage", void 0);
class ReviewResponseDto {
    _id;
    propertyId;
    user;
    rating;
    comment;
    images;
    likes;
    createdAt;
    updatedAt;
}
exports.ReviewResponseDto = ReviewResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "507f1f77bcf86cd799439015",
        description: "Review's unique identifier"
    }),
    __metadata("design:type", String)
], ReviewResponseDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "507f1f77bcf86cd799439013",
        description: "Property ID this review belongs to"
    }),
    __metadata("design:type", String)
], ReviewResponseDto.prototype, "propertyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: ReviewUserDto,
        description: "User who wrote the review"
    }),
    __metadata("design:type", ReviewUserDto)
], ReviewResponseDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 5,
        description: "Rating from 1 to 5 stars",
        minimum: 1,
        maximum: 5
    }),
    __metadata("design:type", Number)
], ReviewResponseDto.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Absolutely loved this property! The location is perfect and the amenities are top-notch. The agent was very helpful throughout the process. Highly recommend!",
        description: "Review comment"
    }),
    __metadata("design:type", String)
], ReviewResponseDto.prototype, "comment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [
            "https://example.com/review1-photo1.jpg",
            "https://example.com/review1-photo2.jpg"
        ],
        description: "Array of review image URLs",
        required: false
    }),
    __metadata("design:type", Array)
], ReviewResponseDto.prototype, "images", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 12,
        description: "Number of likes on this review"
    }),
    __metadata("design:type", Number)
], ReviewResponseDto.prototype, "likes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "2024-01-18T16:30:00.000Z",
        description: "Review creation timestamp"
    }),
    __metadata("design:type", String)
], ReviewResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "2024-01-18T16:30:00.000Z",
        description: "Last update timestamp"
    }),
    __metadata("design:type", String)
], ReviewResponseDto.prototype, "updatedAt", void 0);
class PropertyReviewsResponseDto {
    reviews;
    averageRating;
    totalReviews;
}
exports.PropertyReviewsResponseDto = PropertyReviewsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [ReviewResponseDto],
        description: "Array of property reviews"
    }),
    __metadata("design:type", Array)
], PropertyReviewsResponseDto.prototype, "reviews", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 4.6,
        description: "Average rating for the property"
    }),
    __metadata("design:type", Number)
], PropertyReviewsResponseDto.prototype, "averageRating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 23,
        description: "Total number of reviews"
    }),
    __metadata("design:type", Number)
], PropertyReviewsResponseDto.prototype, "totalReviews", void 0);
class AverageRatingResponseDto {
    propertyId;
    averageRating;
    totalReviews;
    ratingDistribution;
}
exports.AverageRatingResponseDto = AverageRatingResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "507f1f77bcf86cd799439013",
        description: "Property ID"
    }),
    __metadata("design:type", String)
], AverageRatingResponseDto.prototype, "propertyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 4.6,
        description: "Average rating (1-5 stars)"
    }),
    __metadata("design:type", Number)
], AverageRatingResponseDto.prototype, "averageRating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 23,
        description: "Total number of reviews"
    }),
    __metadata("design:type", Number)
], AverageRatingResponseDto.prototype, "totalReviews", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            "5": 12,
            "4": 8,
            "3": 2,
            "2": 1,
            "1": 0
        },
        description: "Rating distribution breakdown"
    }),
    __metadata("design:type", Object)
], AverageRatingResponseDto.prototype, "ratingDistribution", void 0);
//# sourceMappingURL=review-response.dto.js.map