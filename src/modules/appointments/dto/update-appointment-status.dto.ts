import { ApiProperty } from "@nestjs/swagger"
import { IsEnum } from "class-validator"
import { AppointmentStatus } from "../schemas/appointment.schema"

export class UpdateAppointmentStatusDto {
  @ApiProperty({ enum: AppointmentStatus })
  @IsEnum(AppointmentStatus)
  status: AppointmentStatus
}
