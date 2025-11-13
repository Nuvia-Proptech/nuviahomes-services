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
exports.PropertySchema = exports.Property = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const property_type_enum_1 = require("../../../common/enums/property-type.enum");
const listing_type_enum_1 = require("../../../common/enums/listing-type.enum");
const property_status_enum_1 = require("../../../common/enums/property-status.enum");
let Property = class Property extends mongoose_2.Document {
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
    ownerId;
    agentId;
    status;
    approvedBy;
    rejectionReason;
    isFeatured;
    views;
    tags;
    isActive;
};
exports.Property = Property;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Property.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Property.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: property_type_enum_1.PropertyType }),
    __metadata("design:type", String)
], Property.prototype, "propertyType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: listing_type_enum_1.ListingType }),
    __metadata("design:type", String)
], Property.prototype, "listingType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Property.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Property.prototype, "pricePerUnit", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Property.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Property.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Property.prototype, "state", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Property.prototype, "zipCode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], Property.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Property.prototype, "bedrooms", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Property.prototype, "bathrooms", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Property.prototype, "squareFeet", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String] }),
    __metadata("design:type", Array)
], Property.prototype, "amenities", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String] }),
    __metadata("design:type", Array)
], Property.prototype, "images", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Property.prototype, "videoUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String] }),
    __metadata("design:type", Array)
], Property.prototype, "floorPlanImages", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "User" }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Property.prototype, "ownerId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "User" }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Property.prototype, "agentId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: property_status_enum_1.PropertyStatus.PENDING, enum: property_status_enum_1.PropertyStatus }),
    __metadata("design:type", String)
], Property.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Property.prototype, "approvedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Property.prototype, "rejectionReason", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Property.prototype, "isFeatured", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Property.prototype, "views", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String] }),
    __metadata("design:type", Array)
], Property.prototype, "tags", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Property.prototype, "isActive", void 0);
exports.Property = Property = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Property);
exports.PropertySchema = mongoose_1.SchemaFactory.createForClass(Property);
//# sourceMappingURL=property.schema.js.map