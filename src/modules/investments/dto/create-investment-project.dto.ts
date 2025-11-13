import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNumber, IsOptional, IsArray, Min } from "class-validator"

export class CreateInvestmentProjectDto {
  @ApiProperty()
  @IsString()
  title: string

  @ApiProperty()
  @IsString()
  description: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string

  @ApiProperty()
  @IsNumber()
  @Min(0)
  minimumInvestment: number

  @ApiProperty()
  @IsNumber()
  @Min(0)
  targetAmount: number

  @ApiProperty()
  @IsNumber()
  @Min(0)
  expectedROI: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  investmentDuration?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  location?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  highlights?: string[]
}
