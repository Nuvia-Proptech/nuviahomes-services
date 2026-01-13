import { Controller, Get } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse, ApiProperty } from "@nestjs/swagger"
import { AppService } from "./app.service"

class HealthResponseDto {
  @ApiProperty({ 
    example: "Welcome to Nuvia Homes Real Estate API! 🏠",
    description: "Welcome message indicating API is healthy"
  })
  message: string
}

@ApiTags("Health")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ 
    summary: "Health check endpoint",
    description: "Simple health check to verify the API is running and accessible."
  })
  @ApiResponse({ 
    status: 200, 
    description: "Returns welcome message indicating API is healthy",
    type: String
  })
  getHello(): string {
    return this.appService.getHello()
  }
}
