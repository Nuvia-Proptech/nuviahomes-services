import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsOptional } from "class-validator"

export class CreateWalletDto {
  @ApiProperty({ example: "USD", description: "Wallet currency", default: "USD" })
  @IsString()
  @IsOptional()
  currency?: string
}
