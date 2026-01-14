import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString, IsOptional, Min } from "class-validator"

export class TransferDto {
  @ApiProperty({ 
    example: "507f1f77bcf86cd799439012", 
    description: "Recipient's user ID"
  })
  @IsString()
  recipientUserId: string

  @ApiProperty({ 
    example: 250, 
    description: "Amount to transfer (minimum: $1)"
  })
  @IsNumber()
  @Min(1)
  amount: number

  @ApiProperty({ 
    example: "Payment for consulting services", 
    description: "Description of the transfer", 
    required: false
  })
  @IsString()
  @IsOptional()
  description?: string
}
