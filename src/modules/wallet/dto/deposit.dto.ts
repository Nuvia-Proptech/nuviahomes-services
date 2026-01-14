import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString, IsOptional, Min } from "class-validator"

export class DepositDto {
  @ApiProperty({ 
    example: 1000, 
    description: "Amount to deposit (minimum: $1)"
  })
  @IsNumber()
  @Min(1)
  amount: number

  @ApiProperty({ 
    example: "Bank transfer deposit", 
    description: "Description of the deposit", 
    required: false
  })
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty({ 
    example: "REF123456789", 
    description: "Payment reference number", 
    required: false
  })
  @IsString()
  @IsOptional()
  reference?: string
}
