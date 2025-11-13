import { PropertyType } from "@/common/enums/property-type.enum";
import { ListingType } from "@/common/enums/listing-type.enum";
import { PropertyStatus } from "@/common/enums/property-status.enum";
export declare class FilterPropertyDto {
    search?: string;
    propertyType?: PropertyType;
    listingType?: ListingType;
    minPrice?: number;
    maxPrice?: number;
    city?: string;
    state?: string;
    minBedrooms?: number;
    maxBedrooms?: number;
    minBathrooms?: number;
    status?: PropertyStatus;
    isFeatured?: boolean;
    page?: number;
    limit?: number;
}
