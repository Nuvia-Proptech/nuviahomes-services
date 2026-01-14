import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNumber, IsOptional, IsArray, Min } from "class-validator"

export class CreateInvestmentProjectDto {
  @ApiProperty({ 
    example: "Luxury Downtown Apartment Complex",
    description: "Project title"
  })
  @IsString()
  title: string

  @ApiProperty({ 
    example: "A premium 50-unit apartment complex in the heart of downtown, featuring modern amenities, rooftop garden, and premium finishes. Expected completion in 18 months with guaranteed returns.",
    description: "Detailed project description"
  })
  @IsString()
  description: string

  @ApiProperty({ 
    example: "https://example.com/project-main-image.jpg",
    description: "Project main image URL",
    required: false
  })
  @IsOptional()
  @IsString()
  imageUrl?: string

  @ApiProperty({ 
    example: 10000,
    description: "Minimum investment amount in USD"
  })
  @IsNumber()
  @Min(0)
  minimumInvestment: number

  @ApiProperty({ 
    example: 5000000,
    description: "Target funding amount in USD"
  })
  @IsNumber()
  @Min(0)
  targetAmount: number

  @ApiProperty({ 
    example: 15.5,
    description: "Expected return on investment percentage"
  })
  @IsNumber()
  @Min(0)
  expectedROI: number

  @ApiProperty({ 
    example: "18 months",
    description: "Investment duration period",
    required: false
  })
  @IsOptional()
  @IsString()
  investmentDuration?: string

  @ApiProperty({ 
    example: "Downtown Manhattan, New York",
    description: "Project location",
    required: false
  })
  @IsOptional()
  @IsString()
  location?: string

  @ApiProperty({ 
    example: [
      "Prime downtown location",
      "Modern architectural design", 
      "Guaranteed rental income",
      "Professional property management",
      "Tax benefits available"
    ],
    description: "Project highlights and key features",
    required: false
  })
  @IsOptional()
  @IsArray()
  highlights?: string[]
}
