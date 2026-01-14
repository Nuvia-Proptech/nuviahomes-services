import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsEmail } from "class-validator"

export class SubmitContactDto {
  @ApiProperty({ 
    example: "John Doe",
    description: "Contact person's full name"
  })
  @IsString()
  name: string

  @ApiProperty({ 
    example: "john.doe@example.com",
    description: "Contact person's email address"
  })
  @IsEmail()
  email: string

  @ApiProperty({ 
    example: "+1234567890",
    description: "Contact person's phone number"
  })
  @IsString()
  phone: string

  @ApiProperty({ 
    example: "Inquiry about Property Investment",
    description: "Subject of the contact message"
  })
  @IsString()
  subject: string

  @ApiProperty({ 
    example: "Hello, I am interested in learning more about your investment opportunities. Could you please provide more information about the downtown apartment complex project? I would also like to know about the minimum investment requirements and expected returns.",
    description: "Detailed contact message"
  })
  @IsString()
  message: string
}
