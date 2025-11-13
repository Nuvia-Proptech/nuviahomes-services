import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNumber, IsOptional, IsEnum, Min } from "class-validator"
import { InvestmentType } from "../schemas/investment.schema"

export class CreateInvestmentDto {
  @ApiProperty({ enum: InvestmentType })
  @IsEnum(InvestmentType)
  investmentType: InvestmentType

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  propertyId?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  projectId?: string

  @ApiProperty()
  @IsNumber()
  @Min(0)
  amount: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  shares?: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string
}
