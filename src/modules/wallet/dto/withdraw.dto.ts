import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString, IsOptional, Min } from "class-validator"

export class WithdrawDto {
  @ApiProperty({ example: 500, description: "Amount to withdraw" })
  @IsNumber()
  @Min(1)
  amount: number

  @ApiProperty({ example: "Bank withdrawal", description: "Withdrawal description", required: false })
  @IsString()
  @IsOptional()
  description?: string
}
