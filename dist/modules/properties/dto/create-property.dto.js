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
exports.CreatePropertyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const property_type_enum_1 = require("../../../common/enums/property-type.enum");
const listing_type_enum_1 = require("../../../common/enums/listing-type.enum");
class CreatePropertyDto {
    title;
    description;
    propertyType;
    listingType;
    price;
    pricePerUnit;
    address;
    city;
    state;
    zipCode;
    latitude;
    longitude;
    bedrooms;
    bathrooms;
    squareFeet;
    amenities;
    tags;
    videoUrl;
}
exports.CreatePropertyDto = CreatePropertyDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Beautiful 3BR Family Home in Downtown",
        description: "Property title"
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePropertyDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Stunning 3-bedroom, 2-bathroom family home located in the heart of downtown. Features modern amenities, updated kitchen, and spacious living areas. Perfect for families looking for convenience and comfort.",
        description: "Detailed property description"
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePropertyDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: property_type_enum_1.PropertyType.RESIDENTIAL,
        enum: property_type_enum_1.PropertyType,
        description: "Type of property"
    }),
    (0, class_validator_1.IsEnum)(property_type_enum_1.PropertyType),
    __metadata("design:type", String)
], CreatePropertyDto.prototype, "propertyType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: listing_type_enum_1.ListingType.SALE,
        enum: listing_type_enum_1.ListingType,
        description: "Listing type (sale or rent)"
    }),
    (0, class_validator_1.IsEnum)(listing_type_enum_1.ListingType),
    __metadata("design:type", String)
], CreatePropertyDto.prototype, "listingType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 450000,
        description: "Property price in USD"
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreatePropertyDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 150,
        description: "Price per square foot",
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePropertyDto.prototype, "pricePerUnit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "123 Main Street",
        description: "Property street address"
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePropertyDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "New York",
        description: "City where property is located"
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePropertyDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "NY",
        description: "State where property is located"
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePropertyDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "10001",
        description: "ZIP/Postal code"
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePropertyDto.prototype, "zipCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 40.7128,
        description: "Latitude coordinate",
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsLatitude)(),
    __metadata("design:type", Number)
], CreatePropertyDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: -74.0060,
        description: "Longitude coordinate",
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsLongitude)(),
    __metadata("design:type", Number)
], CreatePropertyDto.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 3,
        description: "Number of bedrooms",
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePropertyDto.prototype, "bedrooms", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 2,
        description: "Number of bathrooms",
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePropertyDto.prototype, "bathrooms", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1800,
        description: "Total square footage",
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePropertyDto.prototype, "squareFeet", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ["Air Conditioning", "Hardwood Floors", "Garage", "Garden", "Swimming Pool"],
        description: "List of property amenities",
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreatePropertyDto.prototype, "amenities", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ["luxury", "downtown", "family-friendly", "modern"],
        description: "Property tags for categorization",
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreatePropertyDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "https://example.com/property1-tour.mp4",
        description: "Property video tour URL",
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePropertyDto.prototype, "videoUrl", void 0);
//# sourceMappingURL=create-property.dto.js.map