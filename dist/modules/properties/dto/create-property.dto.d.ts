import { PropertyType } from "@/common/enums/property-type.enum";
import { ListingType } from "@/common/enums/listing-type.enum";
export declare class CreatePropertyDto {
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
    latitude?: number;
    longitude?: number;
    bedrooms?: number;
    bathrooms?: number;
    squareFeet?: number;
    amenities?: string[];
    tags?: string[];
    videoUrl?: string;
}
