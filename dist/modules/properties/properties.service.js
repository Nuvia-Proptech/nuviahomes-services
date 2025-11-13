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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertiesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const property_schema_1 = require("./schemas/property.schema");
const review_schema_1 = require("./schemas/review.schema");
const property_status_enum_1 = require("../../common/enums/property-status.enum");
let PropertiesService = class PropertiesService {
    propertyModel;
    reviewModel;
    constructor(propertyModel, reviewModel) {
        this.propertyModel = propertyModel;
        this.reviewModel = reviewModel;
    }
    async create(createPropertyDto, ownerId) {
        const location = createPropertyDto.latitude && createPropertyDto.longitude
            ? { latitude: createPropertyDto.latitude, longitude: createPropertyDto.longitude }
            : undefined;
        const property = new this.propertyModel({
            ...createPropertyDto,
            ownerId,
            location,
            status: property_status_enum_1.PropertyStatus.PENDING,
        });
        return property.save();
    }
    async findAll(filterDto) {
        const { search, propertyType, listingType, minPrice, maxPrice, city, state, minBedrooms, maxBedrooms, minBathrooms, status, isFeatured, page = 1, limit = 10, } = filterDto;
        const filter = { isActive: true };
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
                { address: { $regex: search, $options: "i" } },
            ];
        }
        if (propertyType)
            filter.propertyType = propertyType;
        if (listingType)
            filter.listingType = listingType;
        if (city)
            filter.city = { $regex: city, $options: "i" };
        if (state)
            filter.state = { $regex: state, $options: "i" };
        if (isFeatured !== undefined)
            filter.isFeatured = isFeatured;
        if (status)
            filter.status = status;
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice)
                filter.price.$gte = minPrice;
            if (maxPrice)
                filter.price.$lte = maxPrice;
        }
        if (minBedrooms || maxBedrooms) {
            filter.bedrooms = {};
            if (minBedrooms)
                filter.bedrooms.$gte = minBedrooms;
            if (maxBedrooms)
                filter.bedrooms.$lte = maxBedrooms;
        }
        if (minBathrooms) {
            filter.bathrooms = { $gte: minBathrooms };
        }
        const skip = (page - 1) * limit;
        const total = await this.propertyModel.countDocuments(filter);
        const data = await this.propertyModel
            .find(filter)
            .skip(skip)
            .limit(limit)
            .populate("ownerId", "firstName lastName email phone")
            .populate("agentId", "firstName lastName email phone")
            .sort({ createdAt: -1 });
        return {
            data,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit),
            },
        };
    }
    async findById(id) {
        const property = await this.propertyModel
            .findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true })
            .populate("ownerId", "firstName lastName email phone company website")
            .populate("agentId", "firstName lastName email phone company");
        if (!property) {
            throw new common_1.NotFoundException("Property not found");
        }
        return property;
    }
    async update(id, updatePropertyDto, userId, userRole) {
        const property = await this.propertyModel.findById(id);
        if (!property) {
            throw new common_1.NotFoundException("Property not found");
        }
        if (property.ownerId.toString() !== userId && userRole !== "super_admin") {
            throw new common_1.ForbiddenException("You can only update your own properties");
        }
        Object.assign(property, updatePropertyDto);
        return property.save();
    }
    async remove(id, userId, userRole) {
        const property = await this.propertyModel.findById(id);
        if (!property) {
            throw new common_1.NotFoundException("Property not found");
        }
        if (property.ownerId.toString() !== userId && userRole !== "super_admin") {
            throw new common_1.ForbiddenException("You can only delete your own properties");
        }
        property.isActive = false;
        return property.save();
    }
    async approveProperty(id, adminId) {
        const property = await this.propertyModel.findByIdAndUpdate(id, {
            status: property_status_enum_1.PropertyStatus.APPROVED,
            approvedBy: adminId,
        }, { new: true });
        if (!property) {
            throw new common_1.NotFoundException("Property not found");
        }
        return property;
    }
    async rejectProperty(id, reason) {
        const property = await this.propertyModel.findByIdAndUpdate(id, {
            status: property_status_enum_1.PropertyStatus.REJECTED,
            rejectionReason: reason,
        }, { new: true });
        if (!property) {
            throw new common_1.NotFoundException("Property not found");
        }
        return property;
    }
    async getFeaturedProperties() {
        return this.propertyModel
            .find({ isFeatured: true, isActive: true, status: property_status_enum_1.PropertyStatus.APPROVED })
            .limit(6)
            .populate("ownerId", "firstName lastName")
            .sort({ createdAt: -1 });
    }
    async getPropertiesByOwner(ownerId, status) {
        const filter = { ownerId };
        if (status)
            filter.status = status;
        return this.propertyModel.find(filter).sort({ createdAt: -1 });
    }
    async createReview(propertyId, userId, createReviewDto) {
        const property = await this.propertyModel.findById(propertyId);
        if (!property) {
            throw new common_1.NotFoundException("Property not found");
        }
        const review = new this.reviewModel({
            propertyId,
            userId,
            ...createReviewDto,
        });
        return review.save();
    }
    async getPropertyReviews(propertyId) {
        return this.reviewModel
            .find({ propertyId })
            .populate("userId", "firstName lastName profileImage")
            .sort({ createdAt: -1 });
    }
    async getAverageRating(propertyId) {
        const result = await this.reviewModel.aggregate([
            { $match: { propertyId: new mongoose_2.Types.ObjectId(propertyId) } },
            { $group: { _id: null, averageRating: { $avg: "$rating" }, totalReviews: { $sum: 1 } } },
        ]);
        return result[0] || { averageRating: 0, totalReviews: 0 };
    }
};
exports.PropertiesService = PropertiesService;
exports.PropertiesService = PropertiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(property_schema_1.Property.name)),
    __param(1, (0, mongoose_1.InjectModel)(review_schema_1.Review.name)),
    __metadata("design:paramtypes", [Function, Function])
], PropertiesService);
//# sourceMappingURL=properties.service.js.map