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
exports.UpdatePropertyDto = exports.PropertyListResponseDto = exports.PropertyResponseDto = exports.PropertyAgentDto = exports.PropertyOwnerDto = exports.LocationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const property_type_enum_1 = require("../../../common/enums/property-type.enum");
const listing_type_enum_1 = require("../../../common/enums/listing-type.enum");
const property_status_enum_1 = require("../../../common/enums/property-status.enum");
class LocationDto {
    latitude;
    longitude;
}
exports.LocationDto = LocationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 40.7128,
        description: "Latitude coordinate"
    }),
    __metadata("design:type", Number)
], LocationDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: -74.0060,
        description: "Longitude coordinate"
    }),
    __metadata("design:type", Number)
], LocationDto.prototype, "longitude", void 0);
class PropertyOwnerDto {
    _id;
    firstName;
    lastName;
    email;
    phone;
}
exports.PropertyOwnerDto = PropertyOwnerDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "507f1f77bcf86cd799439011",
        description: "Owner's unique identifier"
    }),
    __metadata("design:type", String)
], PropertyOwnerDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "John",
        description: "Owner's first name"
    }),
    __metadata("design:type", String)
], PropertyOwnerDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Doe",
        description: "Owner's last name"
    }),
    __metadata("design:type", String)
], PropertyOwnerDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "john.doe@example.com",
        description: "Owner's email address"
    }),
    __metadata("design:type", String)
], PropertyOwnerDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "+1234567890",
        description: "Owner's phone number",
        required: false
    }),
    __metadata("design:type", String)
], PropertyOwnerDto.prototype, "phone", void 0);
class PropertyAgentDto {
    _id;
    firstName;
    lastName;
    email;
    phone;
    company;
}
exports.PropertyAgentDto = PropertyAgentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "507f1f77bcf86cd799439012",
        description: "Agent's unique identifier"
    }),
    __metadata("design:type", String)
], PropertyAgentDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Jane",
        description: "Agent's first name"
    }),
    __metadata("design:type", String)
], PropertyAgentDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Smith",
        description: "Agent's last name"
    }),
    __metadata("design:type", String)
], PropertyAgentDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "jane.smith@nuviahomes.com",
        description: "Agent's email address"
    }),
    __metadata("design:type", String)
], PropertyAgentDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "+1987654321",
        description: "Agent's phone number",
        required: false
    }),
    __metadata("design:type", String)
], PropertyAgentDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Nuvia Homes",
        description: "Agent's company",
        required: false
    }),
    __metadata("design:type", String)
], PropertyAgentDto.prototype, "company", void 0);
class PropertyResponseDto {
    _id;
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
    location;
    bedrooms;
    bathrooms;
    squareFeet;
    amenities;
    images;
    videoUrl;
    floorPlanImages;
    owner;
    agent;
    status;
    approvedBy;
    rejectionReason;
    isFeatured;
    views;
    tags;
    isActive;
    createdAt;
    updatedAt;
}
exports.PropertyResponseDto = PropertyResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "507f1f77bcf86cd799439013",
        description: "Property's unique identifier"
    }),
    __metadata("design:type", String)
], PropertyResponseDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Beautiful 3BR Family Home in Downtown",
        description: "Property title"
    }),
    __metadata("design:type", String)
], PropertyResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Stunning 3-bedroom, 2-bathroom family home located in the heart of downtown. Features modern amenities, updated kitchen, and spacious living areas. Perfect for families looking for convenience and comfort.",
        description: "Detailed property description"
    }),
    __metadata("design:type", String)
], PropertyResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: property_type_enum_1.PropertyType.RESIDENTIAL,
        enum: property_type_enum_1.PropertyType,
        description: "Type of property"
    }),
    __metadata("design:type", String)
], PropertyResponseDto.prototype, "propertyType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: listing_type_enum_1.ListingType.SALE,
        enum: listing_type_enum_1.ListingType,
        description: "Listing type (sale or rent)"
    }),
    __metadata("design:type", String)
], PropertyResponseDto.prototype, "listingType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 450000,
        description: "Property price in USD"
    }),
    __metadata("design:type", Number)
], PropertyResponseDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 150,
        description: "Price per square foot",
        required: false
    }),
    __metadata("design:type", Number)
], PropertyResponseDto.prototype, "pricePerUnit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "123 Main Street",
        description: "Property street address"
    }),
    __metadata("design:type", String)
], PropertyResponseDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "New York",
        description: "City where property is located"
    }),
    __metadata("design:type", String)
], PropertyResponseDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "NY",
        description: "State where property is located"
    }),
    __metadata("design:type", String)
], PropertyResponseDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "10001",
        description: "ZIP/Postal code"
    }),
    __metadata("design:type", String)
], PropertyResponseDto.prototype, "zipCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: LocationDto,
        description: "Geographic coordinates",
        required: false
    }),
    __metadata("design:type", LocationDto)
], PropertyResponseDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 3,
        description: "Number of bedrooms",
        required: false
    }),
    __metadata("design:type", Number)
], PropertyResponseDto.prototype, "bedrooms", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 2,
        description: "Number of bathrooms",
        required: false
    }),
    __metadata("design:type", Number)
], PropertyResponseDto.prototype, "bathrooms", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1800,
        description: "Total square footage",
        required: false
    }),
    __metadata("design:type", Number)
], PropertyResponseDto.prototype, "squareFeet", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ["Air Conditioning", "Hardwood Floors", "Garage", "Garden", "Swimming Pool"],
        description: "List of property amenities",
        required: false
    }),
    __metadata("design:type", Array)
], PropertyResponseDto.prototype, "amenities", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [
            "https://example.com/property1-main.jpg",
            "https://example.com/property1-kitchen.jpg",
            "https://example.com/property1-bedroom.jpg"
        ],
        description: "Array of property image URLs",
        required: false
    }),
    __metadata("design:type", Array)
], PropertyResponseDto.prototype, "images", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "https://example.com/property1-tour.mp4",
        description: "Property video tour URL",
        required: false
    }),
    __metadata("design:type", String)
], PropertyResponseDto.prototype, "videoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [
            "https://example.com/property1-floorplan1.jpg",
            "https://example.com/property1-floorplan2.jpg"
        ],
        description: "Array of floor plan image URLs",
        required: false
    }),
    __metadata("design:type", Array)
], PropertyResponseDto.prototype, "floorPlanImages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: PropertyOwnerDto,
        description: "Property owner information"
    }),
    __metadata("design:type", PropertyOwnerDto)
], PropertyResponseDto.prototype, "owner", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: PropertyAgentDto,
        description: "Assigned real estate agent",
        required: false
    }),
    __metadata("design:type", PropertyAgentDto)
], PropertyResponseDto.prototype, "agent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: property_status_enum_1.PropertyStatus.APPROVED,
        enum: property_status_enum_1.PropertyStatus,
        description: "Current property status"
    }),
    __metadata("design:type", String)
], PropertyResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "507f1f77bcf86cd799439014",
        description: "ID of admin who approved the property",
        required: false
    }),
    __metadata("design:type", String)
], PropertyResponseDto.prototype, "approvedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Property does not meet our quality standards",
        description: "Reason for rejection if status is rejected",
        required: false
    }),
    __metadata("design:type", String)
], PropertyResponseDto.prototype, "rejectionReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: "Whether property is featured"
    }),
    __metadata("design:type", Boolean)
], PropertyResponseDto.prototype, "isFeatured", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 245,
        description: "Number of times property has been viewed"
    }),
    __metadata("design:type", Number)
], PropertyResponseDto.prototype, "views", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ["luxury", "downtown", "family-friendly", "modern"],
        description: "Property tags for categorization",
        required: false
    }),
    __metadata("design:type", Array)
], PropertyResponseDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: "Whether property listing is active"
    }),
    __metadata("design:type", Boolean)
], PropertyResponseDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "2024-01-15T10:30:00.000Z",
        description: "Property creation timestamp"
    }),
    __metadata("design:type", String)
], PropertyResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "2024-01-20T14:45:00.000Z",
        description: "Last update timestamp"
    }),
    __metadata("design:type", String)
], PropertyResponseDto.prototype, "updatedAt", void 0);
class PropertyListResponseDto {
    properties;
    page;
    limit;
    total;
    totalPages;
}
exports.PropertyListResponseDto = PropertyListResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [PropertyResponseDto],
        description: "Array of properties"
    }),
    __metadata("design:type", Array)
], PropertyListResponseDto.prototype, "properties", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: "Current page number"
    }),
    __metadata("design:type", Number)
], PropertyListResponseDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 10,
        description: "Number of items per page"
    }),
    __metadata("design:type", Number)
], PropertyListResponseDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 156,
        description: "Total number of properties"
    }),
    __metadata("design:type", Number)
], PropertyListResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 16,
        description: "Total number of pages"
    }),
    __metadata("design:type", Number)
], PropertyListResponseDto.prototype, "totalPages", void 0);
class UpdatePropertyDto {
    title;
    description;
    price;
    pricePerUnit;
    amenities;
    tags;
    videoUrl;
    isFeatured;
}
exports.UpdatePropertyDto = UpdatePropertyDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Updated Beautiful 3BR Family Home in Downtown",
        description: "Property title",
        required: false
    }),
    __metadata("design:type", String)
], UpdatePropertyDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Updated description with new features and amenities.",
        description: "Property description",
        required: false
    }),
    __metadata("design:type", String)
], UpdatePropertyDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 475000,
        description: "Updated property price",
        required: false
    }),
    __metadata("design:type", Number)
], UpdatePropertyDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 160,
        description: "Updated price per square foot",
        required: false
    }),
    __metadata("design:type", Number)
], UpdatePropertyDto.prototype, "pricePerUnit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ["Air Conditioning", "Hardwood Floors", "Garage", "Garden", "Swimming Pool", "Updated Kitchen"],
        description: "Updated list of amenities",
        required: false
    }),
    __metadata("design:type", Array)
], UpdatePropertyDto.prototype, "amenities", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ["luxury", "downtown", "family-friendly", "modern", "updated"],
        description: "Updated property tags",
        required: false
    }),
    __metadata("design:type", Array)
], UpdatePropertyDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "https://example.com/property1-new-tour.mp4",
        description: "Updated video tour URL",
        required: false
    }),
    __metadata("design:type", String)
], UpdatePropertyDto.prototype, "videoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: "Whether property should be featured",
        required: false
    }),
    __metadata("design:type", Boolean)
], UpdatePropertyDto.prototype, "isFeatured", void 0);
//# sourceMappingURL=property-response.dto.js.map