import { type Model } from "mongoose";
import { Property } from "./schemas/property.schema";
import { Review } from "./schemas/review.schema";
import type { CreatePropertyDto } from "./dto/create-property.dto";
import type { FilterPropertyDto } from "./dto/filter-property.dto";
import type { CreateReviewDto } from "./dto/create-review.dto";
import { PropertyStatus } from "@/common/enums/property-status.enum";
export declare class PropertiesService {
    private readonly propertyModel;
    private readonly reviewModel;
    constructor(propertyModel: Model<Property>, reviewModel: Model<Review>);
    create(createPropertyDto: CreatePropertyDto, ownerId: string): Promise<import("mongoose").Document<unknown, {}, Property, {}, {}> & Property & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAll(filterDto: FilterPropertyDto): Promise<{
        data: (import("mongoose").Document<unknown, {}, Property, {}, {}> & Property & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            pages: number;
        };
    }>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, Property, {}, {}> & Property & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(id: string, updatePropertyDto: any, userId: string, userRole: string): Promise<import("mongoose").Document<unknown, {}, Property, {}, {}> & Property & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    remove(id: string, userId: string, userRole: string): Promise<import("mongoose").Document<unknown, {}, Property, {}, {}> & Property & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    approveProperty(id: string, adminId: string): Promise<import("mongoose").Document<unknown, {}, Property, {}, {}> & Property & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    rejectProperty(id: string, reason: string): Promise<import("mongoose").Document<unknown, {}, Property, {}, {}> & Property & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getFeaturedProperties(): Promise<(import("mongoose").Document<unknown, {}, Property, {}, {}> & Property & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getPropertiesByOwner(ownerId: string, status?: PropertyStatus): Promise<(import("mongoose").Document<unknown, {}, Property, {}, {}> & Property & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    createReview(propertyId: string, userId: string, createReviewDto: CreateReviewDto): Promise<import("mongoose").Document<unknown, {}, Review, {}, {}> & Review & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getPropertyReviews(propertyId: string): Promise<(import("mongoose").Document<unknown, {}, Review, {}, {}> & Review & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getAverageRating(propertyId: string): Promise<any>;
}
