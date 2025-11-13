import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { PropertiesService } from "./properties.service"
import { PropertiesController } from "./properties.controller"
import { Property, PropertySchema } from "./schemas/property.schema"
import { Review, ReviewSchema } from "./schemas/review.schema"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Property.name, schema: PropertySchema },
      { name: Review.name, schema: ReviewSchema },
    ]),
  ],
  controllers: [PropertiesController],
  providers: [PropertiesService],
  exports: [PropertiesService],
})
export class PropertiesModule {}
