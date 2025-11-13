import { Document, Types } from "mongoose";
import { PropertyType } from "@/common/enums/property-type.enum";
import { ListingType } from "@/common/enums/listing-type.enum";
import { PropertyStatus } from "@/common/enums/property-status.enum";
export declare class Property extends Document {
    title: string;
    description: string;
    propertyType: PropertyType;
    listingType: ListingType;
    price: number;
    pricePerUnit?: number;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    location?: {
        latitude: number;
        longitude: number;
    };
    bedrooms?: number;
    bathrooms?: number;
    squareFeet?: number;
    amenities?: string[];
    images?: string[];
    videoUrl?: string;
    floorPlanImages?: string[];
    ownerId: Types.ObjectId;
    agentId?: Types.ObjectId;
    status: PropertyStatus;
    approvedBy?: string;
    rejectionReason?: string;
    isFeatured: boolean;
    views: number;
    tags?: string[];
    isActive: boolean;
}
export declare const PropertySchema: import("mongoose").Schema<Property, import("mongoose").Model<Property, any, any, any, Document<unknown, any, Property, any, {}> & Property & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Property, Document<unknown, {}, import("mongoose").FlatRecord<Property>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Property> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
