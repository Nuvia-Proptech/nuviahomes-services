import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNumber, IsOptional, IsEnum, Min } from "class-validator"
import { InvestmentType } from "../schemas/investment.schema"

export class CreateInvestmentDto {
  @ApiProperty({ 
    example: InvestmentType.PROJECT,
    enum: InvestmentType,
    description: "Type of investment (property or project)"
  })
  @IsEnum(InvestmentType)
  investmentType: InvestmentType

  @ApiProperty({ 
    example: "507f1f77bcf86cd799439013",
    description: "Property ID (required if investmentType is 'property')",
    required: false
  })
  @IsOptional()
  @IsString()
  propertyId?: string

  @ApiProperty({ 
    example: "507f1f77bcf86cd799439013",
    description: "Project ID (required if investmentType is 'project')",
    required: false
  })
  @IsOptional()
  @IsString()
  projectId?: string

  @ApiProperty({ 
    example: 25000,
    description: "Investment amount in USD"
  })
  @IsNumber()
  @Min(0)
  amount: number

  @ApiProperty({ 
    example: 100,
    description: "Number of shares (if applicable)",
    required: false
  })
  @IsOptional()
  @IsNumber()
  shares?: number

  @ApiProperty({ 
    example: "Investment made through referral program",
    description: "Additional notes about the investment",
    required: false
  })
  @IsOptional()
  @IsString()
  notes?: string
}
