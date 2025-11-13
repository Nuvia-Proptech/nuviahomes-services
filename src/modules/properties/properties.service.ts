import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { type Model, Types } from "mongoose"
import { Property } from "./schemas/property.schema"
import { Review } from "./schemas/review.schema"
import type { CreatePropertyDto } from "./dto/create-property.dto"
import type { FilterPropertyDto } from "./dto/filter-property.dto"
import type { CreateReviewDto } from "./dto/create-review.dto"
import { PropertyStatus } from "@/common/enums/property-status.enum"

@Injectable()
export class PropertiesService {
  constructor(
    @InjectModel(Property.name) private readonly propertyModel: Model<Property>,
    @InjectModel(Review.name) private readonly reviewModel: Model<Review>,
  ) {}

  async create(createPropertyDto: CreatePropertyDto, ownerId: string) {
    const location =
      createPropertyDto.latitude && createPropertyDto.longitude
        ? { latitude: createPropertyDto.latitude, longitude: createPropertyDto.longitude }
        : undefined

    const property = new this.propertyModel({
      ...createPropertyDto,
      ownerId,
      location,
      status: PropertyStatus.PENDING,
    })

    return property.save()
  }

  async findAll(filterDto: FilterPropertyDto) {
    const {
      search,
      propertyType,
      listingType,
      minPrice,
      maxPrice,
      city,
      state,
      minBedrooms,
      maxBedrooms,
      minBathrooms,
      status,
      isFeatured,
      page = 1,
      limit = 10,
    } = filterDto

    const filter: any = { isActive: true }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { address: { $regex: search, $options: "i" } },
      ]
    }

    if (propertyType) filter.propertyType = propertyType
    if (listingType) filter.listingType = listingType
    if (city) filter.city = { $regex: city, $options: "i" }
    if (state) filter.state = { $regex: state, $options: "i" }
    if (isFeatured !== undefined) filter.isFeatured = isFeatured
    if (status) filter.status = status

    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) filter.price.$gte = minPrice
      if (maxPrice) filter.price.$lte = maxPrice
    }

    if (minBedrooms || maxBedrooms) {
      filter.bedrooms = {}
      if (minBedrooms) filter.bedrooms.$gte = minBedrooms
      if (maxBedrooms) filter.bedrooms.$lte = maxBedrooms
    }

    if (minBathrooms) {
      filter.bathrooms = { $gte: minBathrooms }
    }

    const skip = (page - 1) * limit
    const total = await this.propertyModel.countDocuments(filter)
    const data = await this.propertyModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .populate("ownerId", "firstName lastName email phone")
      .populate("agentId", "firstName lastName email phone")
      .sort({ createdAt: -1 })

    return {
      data,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    }
  }

  async findById(id: string) {
    const property = await this.propertyModel
      .findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true })
      .populate("ownerId", "firstName lastName email phone company website")
      .populate("agentId", "firstName lastName email phone company")

    if (!property) {
      throw new NotFoundException("Property not found")
    }

    return property
  }

  async update(id: string, updatePropertyDto: any, userId: string, userRole: string) {
    const property = await this.propertyModel.findById(id)
    if (!property) {
      throw new NotFoundException("Property not found")
    }

    if (property.ownerId.toString() !== userId && userRole !== "super_admin") {
      throw new ForbiddenException("You can only update your own properties")
    }

    Object.assign(property, updatePropertyDto)
    return property.save()
  }

  async remove(id: string, userId: string, userRole: string) {
    const property = await this.propertyModel.findById(id)
    if (!property) {
      throw new NotFoundException("Property not found")
    }

    if (property.ownerId.toString() !== userId && userRole !== "super_admin") {
      throw new ForbiddenException("You can only delete your own properties")
    }

    property.isActive = false
    return property.save()
  }

  async approveProperty(id: string, adminId: string) {
    const property = await this.propertyModel.findByIdAndUpdate(
      id,
      {
        status: PropertyStatus.APPROVED,
        approvedBy: adminId,
      },
      { new: true },
    )

    if (!property) {
      throw new NotFoundException("Property not found")
    }

    return property
  }

  async rejectProperty(id: string, reason: string) {
    const property = await this.propertyModel.findByIdAndUpdate(
      id,
      {
        status: PropertyStatus.REJECTED,
        rejectionReason: reason,
      },
      { new: true },
    )

    if (!property) {
      throw new NotFoundException("Property not found")
    }

    return property
  }

  async getFeaturedProperties() {
    return this.propertyModel
      .find({ isFeatured: true, isActive: true, status: PropertyStatus.APPROVED })
      .limit(6)
      .populate("ownerId", "firstName lastName")
      .sort({ createdAt: -1 })
  }

  async getPropertiesByOwner(ownerId: string, status?: PropertyStatus) {
    const filter: any = { ownerId }
    if (status) filter.status = status

    return this.propertyModel.find(filter).sort({ createdAt: -1 })
  }

  // Reviews
  async createReview(propertyId: string, userId: string, createReviewDto: CreateReviewDto) {
    const property = await this.propertyModel.findById(propertyId)
    if (!property) {
      throw new NotFoundException("Property not found")
    }

    const review = new this.reviewModel({
      propertyId,
      userId,
      ...createReviewDto,
    })

    return review.save()
  }

  async getPropertyReviews(propertyId: string) {
    return this.reviewModel
      .find({ propertyId })
      .populate("userId", "firstName lastName profileImage")
      .sort({ createdAt: -1 })
  }

  async getAverageRating(propertyId: string) {
    const result = await this.reviewModel.aggregate([
      { $match: { propertyId: new Types.ObjectId(propertyId) } },
      { $group: { _id: null, averageRating: { $avg: "$rating" }, totalReviews: { $sum: 1 } } },
    ])

    return result[0] || { averageRating: 0, totalReviews: 0 }
  }
}
