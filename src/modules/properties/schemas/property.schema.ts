import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"
import { PropertyType } from "@/common/enums/property-type.enum"
import { ListingType } from "@/common/enums/listing-type.enum"
import { PropertyStatus } from "@/common/enums/property-status.enum"

@Schema({ timestamps: true })
export class Property extends Document {
  @Prop({ required: true })
  title: string

  @Prop({ required: true })
  description: string

  @Prop({ required: true, enum: PropertyType })
  propertyType: PropertyType

  @Prop({ required: true, enum: ListingType })
  listingType: ListingType

  @Prop({ required: true })
  price: number

  @Prop()
  pricePerUnit?: number

  @Prop({ required: true })
  address: string

  @Prop({ required: true })
  city: string

  @Prop({ required: true })
  state: string

  @Prop({ required: true })
  zipCode: string

  @Prop({ type: Object })
  location?: {
    latitude: number
    longitude: number
  }

  @Prop()
  bedrooms?: number

  @Prop()
  bathrooms?: number

  @Prop()
  squareFeet?: number

  @Prop({ type: [String] })
  amenities?: string[]

  @Prop({ type: [String] })
  images?: string[]

  @Prop()
  videoUrl?: string

  @Prop({ type: [String] })
  floorPlanImages?: string[]

  @Prop({ type: Types.ObjectId, ref: "User" })
  ownerId: Types.ObjectId

  @Prop({ type: Types.ObjectId, ref: "User" })
  agentId?: Types.ObjectId

  @Prop({ default: PropertyStatus.PENDING, enum: PropertyStatus })
  status: PropertyStatus

  @Prop()
  approvedBy?: string

  @Prop()
  rejectionReason?: string

  @Prop({ default: false })
  isFeatured: boolean

  @Prop({ default: 0 })
  views: number

  @Prop({ type: [String] })
  tags?: string[]

  @Prop({ default: true })
  isActive: boolean
}

export const PropertySchema = SchemaFactory.createForClass(Property)
