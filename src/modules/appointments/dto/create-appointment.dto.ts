import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsDateString, IsEnum, IsOptional } from "class-validator"
import { AppointmentType } from "../schemas/appointment.schema"

export class CreateAppointmentDto {
  @ApiProperty({ enum: AppointmentType })
  @IsEnum(AppointmentType)
  appointmentType: AppointmentType

  @ApiProperty()
  @IsString()
  agentId: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  propertyId?: string

  @ApiProperty()
  @IsDateString()
  scheduledDate: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  location?: string
}
