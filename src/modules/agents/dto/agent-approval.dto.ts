import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsString, IsOptional } from "class-validator"

export class AgentApprovalDto {
  @ApiProperty({ 
    example: true,
    description: "Whether to approve or reject the agent request"
  })
  @IsBoolean()
  approved: boolean

  @ApiProperty({ 
    example: "Your application has been approved. Welcome to our agent network!",
    description: "Admin comments or feedback",
    required: false
  })
  @IsString()
  @IsOptional()
  adminComments?: string
}