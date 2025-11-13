import { PartialType } from "@nestjs/swagger"
import { CreateUserDto } from "./create-user.dto"
import { IsOptional, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  profileImage?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  website?: string
}
