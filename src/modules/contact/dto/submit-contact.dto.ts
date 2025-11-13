import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsEmail } from "class-validator"

export class SubmitContactDto {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsString()
  phone: string

  @ApiProperty()
  @IsString()
  subject: string

  @ApiProperty()
  @IsString()
  message: string
}
