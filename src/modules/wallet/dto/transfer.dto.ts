import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString, IsOptional, Min } from "class-validator"

export class TransferDto {
  @ApiProperty({ example: "507f1f77bcf86cd799439011", description: "Recipient user ID" })
  @IsString()
  recipientUserId: string

  @ApiProperty({ example: 250, description: "Amount to transfer" })
  @IsNumber()
  @Min(1)
  amount: number

  @ApiProperty({ example: "Payment for services", description: "Transfer description", required: false })
  @IsString()
  @IsOptional()
  description?: string
}
