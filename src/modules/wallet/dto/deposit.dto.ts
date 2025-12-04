import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString, IsOptional, Min } from "class-validator"

export class DepositDto {
  @ApiProperty({ example: 1000, description: "Amount to deposit" })
  @IsNumber()
  @Min(1)
  amount: number

  @ApiProperty({ example: "Bank transfer", description: "Deposit description", required: false })
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty({ example: "REF123456", description: "Payment reference", required: false })
  @IsString()
  @IsOptional()
  reference?: string
}
