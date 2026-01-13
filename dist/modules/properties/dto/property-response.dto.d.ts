import { PropertyType } from "@/common/enums/property-type.enum";
import { ListingType } from "@/common/enums/listing-type.enum";
import { PropertyStatus } from "@/common/enums/property-status.enum";
export declare class LocationDto {
    latitude: number;
    longitude: number;
}
export declare class PropertyOwnerDto {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
}
export declare class PropertyAgentDto {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    company?: string;
}
export declare class PropertyResponseDto {
    _id: string;
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
    location?: LocationDto;
    bedrooms?: number;
    bathrooms?: number;
    squareFeet?: number;
    amenities?: string[];
    images?: string[];
    videoUrl?: string;
    floorPlanImages?: string[];
    owner: PropertyOwnerDto;
    agent?: PropertyAgentDto;
    status: PropertyStatus;
    approvedBy?: string;
    rejectionReason?: string;
    isFeatured: boolean;
    views: number;
    tags?: string[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
export declare class PropertyListResponseDto {
    properties: PropertyResponseDto[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}
export declare class UpdatePropertyDto {
    title?: string;
    description?: string;
    price?: number;
    pricePerUnit?: number;
    amenities?: string[];
    tags?: string[];
    videoUrl?: string;
    isFeatured?: boolean;
}
