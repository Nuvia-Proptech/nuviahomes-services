import { PropertiesService } from "./properties.service";
import type { CreatePropertyDto } from "./dto/create-property.dto";
import type { FilterPropertyDto } from "./dto/filter-property.dto";
import type { CreateReviewDto } from "./dto/create-review.dto";
export declare class PropertiesController {
    private readonly propertiesService;
    constructor(propertiesService: PropertiesService);
    create(createPropertyDto: CreatePropertyDto, user: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/property.schema").Property, {}, {}> & import("./schemas/property.schema").Property & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAll(filterDto: FilterPropertyDto): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/property.schema").Property, {}, {}> & import("./schemas/property.schema").Property & Required<{
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
    getFeatured(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/property.schema").Property, {}, {}> & import("./schemas/property.schema").Property & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/property.schema").Property, {}, {}> & import("./schemas/property.schema").Property & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(id: string, updatePropertyDto: any, user: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/property.schema").Property, {}, {}> & import("./schemas/property.schema").Property & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    remove(id: string, user: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/property.schema").Property, {}, {}> & import("./schemas/property.schema").Property & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    approveProperty(id: string, user: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/property.schema").Property, {}, {}> & import("./schemas/property.schema").Property & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    rejectProperty(id: string, reason: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/property.schema").Property, {}, {}> & import("./schemas/property.schema").Property & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getPropertiesByOwner(ownerId: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/property.schema").Property, {}, {}> & import("./schemas/property.schema").Property & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    createReview(propertyId: string, createReviewDto: CreateReviewDto, user: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/review.schema").Review, {}, {}> & import("./schemas/review.schema").Review & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getPropertyReviews(propertyId: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/review.schema").Review, {}, {}> & import("./schemas/review.schema").Review & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getAverageRating(propertyId: string): Promise<any>;
}
