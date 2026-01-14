import { ApiProperty } from "@nestjs/swagger"
import { ProjectStatus } from "../schemas/investment-project.schema"
import { InvestmentType, InvestmentStatus } from "../schemas/investment.schema"

export class InvestmentProjectCreatorDto {
  @ApiProperty({ 
    example: "507f1f77bcf86cd799439011",
    description: "Creator's unique identifier"
  })
  _id: string

  @ApiProperty({ 
    example: "John",
    description: "Creator's first name"
  })
  firstName: string

  @ApiProperty({ 
    example: "Doe",
    description: "Creator's last name"
  })
  lastName: string

  @ApiProperty({ 
    example: "john.doe@example.com",
    description: "Creator's email address"
  })
  email: string

  @ApiProperty({ 
    example: "Nuvia Homes",
    description: "Creator's company",
    required: false
  })
  company?: string
}

export class InvestmentProjectResponseDto {
  @ApiProperty({ 
    example: "507f1f77bcf86cd799439013",
    description: "Project's unique identifier"
  })
  _id: string

  @ApiProperty({ 
    example: "Luxury Downtown Apartment Complex",
    description: "Project title"
  })
  title: string

  @ApiProperty({ 
    example: "A premium 50-unit apartment complex in the heart of downtown, featuring modern amenities, rooftop garden, and premium finishes. Expected completion in 18 months with guaranteed returns.",
    description: "Detailed project description"
  })
  description: string

  @ApiProperty({ 
    example: "https://example.com/project-main-image.jpg",
    description: "Project main image URL",
    required: false
  })
  imageUrl?: string

  @ApiProperty({ 
    example: 10000,
    description: "Minimum investment amount in USD"
  })
  minimumInvestment: number

  @ApiProperty({ 
    example: 5000000,
    description: "Target funding amount in USD"
  })
  targetAmount: number

  @ApiProperty({ 
    example: 2750000,
    description: "Amount raised so far in USD"
  })
  raisedAmount: number

  @ApiProperty({ 
    example: 15.5,
    description: "Expected return on investment percentage"
  })
  expectedROI: number

  @ApiProperty({ 
    example: "18 months",
    description: "Investment duration period",
    required: false
  })
  investmentDuration?: string

  @ApiProperty({ 
    example: ProjectStatus.ACTIVE,
    enum: ProjectStatus,
    description: "Current project status"
  })
  status: ProjectStatus

  @ApiProperty({ 
    type: InvestmentProjectCreatorDto,
    description: "Project creator information"
  })
  creator: InvestmentProjectCreatorDto

  @ApiProperty({ 
    example: "Downtown Manhattan, New York",
    description: "Project location",
    required: false
  })
  location?: string

  @ApiProperty({ 
    example: [
      "Prime downtown location",
      "Modern architectural design",
      "Guaranteed rental income",
      "Professional property management",
      "Tax benefits available"
    ],
    description: "Project highlights and key features",
    required: false
  })
  highlights?: string[]

  @ApiProperty({ 
    example: "2025-08-15T00:00:00.000Z",
    description: "Expected project completion date",
    required: false
  })
  completionDate?: string

  @ApiProperty({ 
    example: 127,
    description: "Number of investors in this project"
  })
  investorCount: number

  @ApiProperty({ 
    example: true,
    description: "Whether project is active for investments"
  })
  isActive: boolean

  @ApiProperty({ 
    example: "2024-01-15T10:30:00.000Z",
    description: "Project creation timestamp"
  })
  createdAt: string

  @ApiProperty({ 
    example: "2024-01-20T14:45:00.000Z",
    description: "Last update timestamp"
  })
  updatedAt: string
}

export class ProjectStatsResponseDto {
  @ApiProperty({ 
    example: "507f1f77bcf86cd799439013",
    description: "Project ID"
  })
  projectId: string

  @ApiProperty({ 
    example: 2750000,
    description: "Total amount raised"
  })
  totalRaised: number

  @ApiProperty({ 
    example: 5000000,
    description: "Target amount"
  })
  targetAmount: number

  @ApiProperty({ 
    example: 55,
    description: "Funding percentage completed"
  })
  fundingPercentage: number

  @ApiProperty({ 
    example: 127,
    description: "Total number of investors"
  })
  investorCount: number

  @ApiProperty({ 
    example: 21653,
    description: "Average investment amount"
  })
  averageInvestment: number

  @ApiProperty({ 
    example: 2250000,
    description: "Remaining amount needed"
  })
  remainingAmount: number

  @ApiProperty({ 
    example: 45,
    description: "Days remaining for investment (if applicable)"
  })
  daysRemaining?: number
}

export class InvestorDto {
  @ApiProperty({ 
    example: "507f1f77bcf86cd799439012",
    description: "Investor's unique identifier"
  })
  _id: string

  @ApiProperty({ 
    example: "Jane",
    description: "Investor's first name"
  })
  firstName: string

  @ApiProperty({ 
    example: "Smith",
    description: "Investor's last name"
  })
  lastName: string

  @ApiProperty({ 
    example: 25000,
    description: "Investment amount"
  })
  investmentAmount: number

  @ApiProperty({ 
    example: "2024-01-18T12:00:00.000Z",
    description: "Investment date"
  })
  investmentDate: string

  @ApiProperty({ 
    example: InvestmentStatus.ACTIVE,
    enum: InvestmentStatus,
    description: "Investment status"
  })
  status: InvestmentStatus
}

export class ProjectInvestmentsResponseDto {
  @ApiProperty({ 
    example: "507f1f77bcf86cd799439013",
    description: "Project ID"
  })
  projectId: string

  @ApiProperty({ 
    type: [InvestorDto],
    description: "List of project investors"
  })
  investors: InvestorDto[]

  @ApiProperty({ 
    example: 127,
    description: "Total number of investors"
  })
  totalInvestors: number

  @ApiProperty({ 
    example: 2750000,
    description: "Total amount invested"
  })
  totalInvested: number
}

export class InvestmentResponseDto {
  @ApiProperty({ 
    example: "507f1f77bcf86cd799439014",
    description: "Investment's unique identifier"
  })
  _id: string

  @ApiProperty({ 
    example: InvestmentType.PROJECT,
    enum: InvestmentType,
    description: "Type of investment"
  })
  investmentType: InvestmentType

  @ApiProperty({ 
    example: "507f1f77bcf86cd799439013",
    description: "Related property ID (if property investment)",
    required: false
  })
  propertyId?: string

  @ApiProperty({ 
    example: "507f1f77bcf86cd799439013",
    description: "Related project ID (if project investment)",
    required: false
  })
  projectId?: string

  @ApiProperty({ 
    example: "507f1f77bcf86cd799439012",
    description: "Investor's user ID"
  })
  investorId: string

  @ApiProperty({ 
    example: 25000,
    description: "Investment amount in USD"
  })
  amount: number

  @ApiProperty({ 
    example: 100,
    description: "Number of shares (if applicable)",
    required: false
  })
  shares?: number

  @ApiProperty({ 
    example: InvestmentStatus.ACTIVE,
    enum: InvestmentStatus,
    description: "Current investment status"
  })
  status: InvestmentStatus

  @ApiProperty({ 
    example: 28750,
    description: "Expected return amount",
    required: false
  })
  expectedReturn?: number

  @ApiProperty({ 
    example: "2025-08-15T00:00:00.000Z",
    description: "Expected return date",
    required: false
  })
  expectedReturnDate?: string

  @ApiProperty({ 
    example: 29200,
    description: "Actual return amount (if completed)",
    required: false
  })
  actualReturn?: number

  @ApiProperty({ 
    example: "2025-08-10T00:00:00.000Z",
    description: "Actual return date (if completed)",
    required: false
  })
  actualReturnDate?: string

  @ApiProperty({ 
    example: [
      "https://example.com/investment-contract.pdf",
      "https://example.com/project-prospectus.pdf"
    ],
    description: "Investment-related documents",
    required: false
  })
  documents?: string[]

  @ApiProperty({ 
    example: "Investment made through referral program",
    description: "Additional notes about the investment",
    required: false
  })
  notes?: string

  @ApiProperty({ 
    example: "2024-01-18T12:00:00.000Z",
    description: "Investment creation timestamp"
  })
  createdAt: string

  @ApiProperty({ 
    example: "2024-01-18T12:00:00.000Z",
    description: "Last update timestamp"
  })
  updatedAt: string
}

export class UpdateInvestmentProjectDto {
  @ApiProperty({ 
    example: "Updated Luxury Downtown Apartment Complex",
    description: "Updated project title",
    required: false
  })
  title?: string

  @ApiProperty({ 
    example: "Updated description with new features and timeline adjustments.",
    description: "Updated project description",
    required: false
  })
  description?: string

  @ApiProperty({ 
    example: "https://example.com/updated-project-image.jpg",
    description: "Updated project image URL",
    required: false
  })
  imageUrl?: string

  @ApiProperty({ 
    example: 12000,
    description: "Updated minimum investment amount",
    required: false
  })
  minimumInvestment?: number

  @ApiProperty({ 
    example: 5500000,
    description: "Updated target amount",
    required: false
  })
  targetAmount?: number

  @ApiProperty({ 
    example: 16.0,
    description: "Updated expected ROI percentage",
    required: false
  })
  expectedROI?: number

  @ApiProperty({ 
    example: "20 months",
    description: "Updated investment duration",
    required: false
  })
  investmentDuration?: string

  @ApiProperty({ 
    example: "Downtown Manhattan, New York - Updated Location",
    description: "Updated project location",
    required: false
  })
  location?: string

  @ApiProperty({ 
    example: [
      "Prime downtown location",
      "Modern architectural design",
      "Guaranteed rental income",
      "Professional property management",
      "Tax benefits available",
      "Updated: Green building certification"
    ],
    description: "Updated project highlights",
    required: false
  })
  highlights?: string[]

  @ApiProperty({ 
    example: "2025-10-15T00:00:00.000Z",
    description: "Updated completion date",
    required: false
  })
  completionDate?: string
}