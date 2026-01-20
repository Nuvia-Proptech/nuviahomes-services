"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInvestmentProjectDto = exports.InvestmentResponseDto = exports.ProjectInvestmentsResponseDto = exports.InvestorDto = exports.ProjectStatsResponseDto = exports.InvestmentProjectResponseDto = exports.InvestmentProjectCreatorDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const investment_project_schema_1 = require("../schemas/investment-project.schema");
const investment_schema_1 = require("../schemas/investment.schema");
class InvestmentProjectCreatorDto {
    _id;
    firstName;
    lastName;
    email;
    company;
}
exports.InvestmentProjectCreatorDto = InvestmentProjectCreatorDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "507f1f77bcf86cd799439011",
        description: "Creator's unique identifier"
    }),
    __metadata("design:type", String)
], InvestmentProjectCreatorDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "John",
        description: "Creator's first name"
    }),
    __metadata("design:type", String)
], InvestmentProjectCreatorDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Doe",
        description: "Creator's last name"
    }),
    __metadata("design:type", String)
], InvestmentProjectCreatorDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "john.doe@example.com",
        description: "Creator's email address"
    }),
    __metadata("design:type", String)
], InvestmentProjectCreatorDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Nuvia Homes",
        description: "Creator's company",
        required: false
    }),
    __metadata("design:type", String)
], InvestmentProjectCreatorDto.prototype, "company", void 0);
class InvestmentProjectResponseDto {
    _id;
    title;
    description;
    imageUrl;
    minimumInvestment;
    targetAmount;
    raisedAmount;
    expectedROI;
    investmentDuration;
    status;
    creator;
    location;
    highlights;
    completionDate;
    investorCount;
    isActive;
    createdAt;
    updatedAt;
}
exports.InvestmentProjectResponseDto = InvestmentProjectResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "507f1f77bcf86cd799439013",
        description: "Project's unique identifier"
    }),
    __metadata("design:type", String)
], InvestmentProjectResponseDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Luxury Downtown Apartment Complex",
        description: "Project title"
    }),
    __metadata("design:type", String)
], InvestmentProjectResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "A premium 50-unit apartment complex in the heart of downtown, featuring modern amenities, rooftop garden, and premium finishes. Expected completion in 18 months with guaranteed returns.",
        description: "Detailed project description"
    }),
    __metadata("design:type", String)
], InvestmentProjectResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "https://example.com/project-main-image.jpg",
        description: "Project main image URL",
        required: false
    }),
    __metadata("design:type", String)
], InvestmentProjectResponseDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 10000,
        description: "Minimum investment amount in USD"
    }),
    __metadata("design:type", Number)
], InvestmentProjectResponseDto.prototype, "minimumInvestment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 5000000,
        description: "Target funding amount in USD"
    }),
    __metadata("design:type", Number)
], InvestmentProjectResponseDto.prototype, "targetAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 2750000,
        description: "Amount raised so far in USD"
    }),
    __metadata("design:type", Number)
], InvestmentProjectResponseDto.prototype, "raisedAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 15.5,
        description: "Expected return on investment percentage"
    }),
    __metadata("design:type", Number)
], InvestmentProjectResponseDto.prototype, "expectedROI", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "18 months",
        description: "Investment duration period",
        required: false
    }),
    __metadata("design:type", String)
], InvestmentProjectResponseDto.prototype, "investmentDuration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: investment_project_schema_1.ProjectStatus.ACTIVE,
        enum: investment_project_schema_1.ProjectStatus,
        description: "Current project status"
    }),
    __metadata("design:type", String)
], InvestmentProjectResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: InvestmentProjectCreatorDto,
        description: "Project creator information"
    }),
    __metadata("design:type", InvestmentProjectCreatorDto)
], InvestmentProjectResponseDto.prototype, "creator", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Downtown Manhattan, New York",
        description: "Project location",
        required: false
    }),
    __metadata("design:type", String)
], InvestmentProjectResponseDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [
            "Prime downtown location",
            "Modern architectural design",
            "Guaranteed rental income",
            "Professional property management",
            "Tax benefits available"
        ],
        description: "Project highlights and key features",
        required: false
    }),
    __metadata("design:type", Array)
], InvestmentProjectResponseDto.prototype, "highlights", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "2025-08-15T00:00:00.000Z",
        description: "Expected project completion date",
        required: false
    }),
    __metadata("design:type", String)
], InvestmentProjectResponseDto.prototype, "completionDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 127,
        description: "Number of investors in this project"
    }),
    __metadata("design:type", Number)
], InvestmentProjectResponseDto.prototype, "investorCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: "Whether project is active for investments"
    }),
    __metadata("design:type", Boolean)
], InvestmentProjectResponseDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "2024-01-15T10:30:00.000Z",
        description: "Project creation timestamp"
    }),
    __metadata("design:type", String)
], InvestmentProjectResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "2024-01-20T14:45:00.000Z",
        description: "Last update timestamp"
    }),
    __metadata("design:type", String)
], InvestmentProjectResponseDto.prototype, "updatedAt", void 0);
class ProjectStatsResponseDto {
    projectId;
    totalRaised;
    targetAmount;
    fundingPercentage;
    investorCount;
    averageInvestment;
    remainingAmount;
    daysRemaining;
}
exports.ProjectStatsResponseDto = ProjectStatsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "507f1f77bcf86cd799439013",
        description: "Project ID"
    }),
    __metadata("design:type", String)
], ProjectStatsResponseDto.prototype, "projectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 2750000,
        description: "Total amount raised"
    }),
    __metadata("design:type", Number)
], ProjectStatsResponseDto.prototype, "totalRaised", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 5000000,
        description: "Target amount"
    }),
    __metadata("design:type", Number)
], ProjectStatsResponseDto.prototype, "targetAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 55,
        description: "Funding percentage completed"
    }),
    __metadata("design:type", Number)
], ProjectStatsResponseDto.prototype, "fundingPercentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 127,
        description: "Total number of investors"
    }),
    __metadata("design:type", Number)
], ProjectStatsResponseDto.prototype, "investorCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 21653,
        description: "Average investment amount"
    }),
    __metadata("design:type", Number)
], ProjectStatsResponseDto.prototype, "averageInvestment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 2250000,
        description: "Remaining amount needed"
    }),
    __metadata("design:type", Number)
], ProjectStatsResponseDto.prototype, "remainingAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 45,
        description: "Days remaining for investment (if applicable)"
    }),
    __metadata("design:type", Number)
], ProjectStatsResponseDto.prototype, "daysRemaining", void 0);
class InvestorDto {
    _id;
    firstName;
    lastName;
    investmentAmount;
    investmentDate;
    status;
}
exports.InvestorDto = InvestorDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "507f1f77bcf86cd799439012",
        description: "Investor's unique identifier"
    }),
    __metadata("design:type", String)
], InvestorDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Jane",
        description: "Investor's first name"
    }),
    __metadata("design:type", String)
], InvestorDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Smith",
        description: "Investor's last name"
    }),
    __metadata("design:type", String)
], InvestorDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 25000,
        description: "Investment amount"
    }),
    __metadata("design:type", Number)
], InvestorDto.prototype, "investmentAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "2024-01-18T12:00:00.000Z",
        description: "Investment date"
    }),
    __metadata("design:type", String)
], InvestorDto.prototype, "investmentDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: investment_schema_1.InvestmentStatus.ACTIVE,
        enum: investment_schema_1.InvestmentStatus,
        description: "Investment status"
    }),
    __metadata("design:type", String)
], InvestorDto.prototype, "status", void 0);
class ProjectInvestmentsResponseDto {
    projectId;
    investors;
    totalInvestors;
    totalInvested;
}
exports.ProjectInvestmentsResponseDto = ProjectInvestmentsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "507f1f77bcf86cd799439013",
        description: "Project ID"
    }),
    __metadata("design:type", String)
], ProjectInvestmentsResponseDto.prototype, "projectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [InvestorDto],
        description: "List of project investors"
    }),
    __metadata("design:type", Array)
], ProjectInvestmentsResponseDto.prototype, "investors", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 127,
        description: "Total number of investors"
    }),
    __metadata("design:type", Number)
], ProjectInvestmentsResponseDto.prototype, "totalInvestors", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 2750000,
        description: "Total amount invested"
    }),
    __metadata("design:type", Number)
], ProjectInvestmentsResponseDto.prototype, "totalInvested", void 0);
class InvestmentResponseDto {
    _id;
    investmentType;
    propertyId;
    projectId;
    investorId;
    amount;
    shares;
    status;
    expectedReturn;
    expectedReturnDate;
    actualReturn;
    actualReturnDate;
    documents;
    notes;
    createdAt;
    updatedAt;
}
exports.InvestmentResponseDto = InvestmentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "507f1f77bcf86cd799439014",
        description: "Investment's unique identifier"
    }),
    __metadata("design:type", String)
], InvestmentResponseDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: investment_schema_1.InvestmentType.PROJECT,
        enum: investment_schema_1.InvestmentType,
        description: "Type of investment"
    }),
    __metadata("design:type", String)
], InvestmentResponseDto.prototype, "investmentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "507f1f77bcf86cd799439013",
        description: "Related property ID (if property investment)",
        required: false
    }),
    __metadata("design:type", String)
], InvestmentResponseDto.prototype, "propertyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "507f1f77bcf86cd799439013",
        description: "Related project ID (if project investment)",
        required: false
    }),
    __metadata("design:type", String)
], InvestmentResponseDto.prototype, "projectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "507f1f77bcf86cd799439012",
        description: "Investor's user ID"
    }),
    __metadata("design:type", String)
], InvestmentResponseDto.prototype, "investorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 25000,
        description: "Investment amount in USD"
    }),
    __metadata("design:type", Number)
], InvestmentResponseDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 100,
        description: "Number of shares (if applicable)",
        required: false
    }),
    __metadata("design:type", Number)
], InvestmentResponseDto.prototype, "shares", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: investment_schema_1.InvestmentStatus.ACTIVE,
        enum: investment_schema_1.InvestmentStatus,
        description: "Current investment status"
    }),
    __metadata("design:type", String)
], InvestmentResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 28750,
        description: "Expected return amount",
        required: false
    }),
    __metadata("design:type", Number)
], InvestmentResponseDto.prototype, "expectedReturn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "2025-08-15T00:00:00.000Z",
        description: "Expected return date",
        required: false
    }),
    __metadata("design:type", String)
], InvestmentResponseDto.prototype, "expectedReturnDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 29200,
        description: "Actual return amount (if completed)",
        required: false
    }),
    __metadata("design:type", Number)
], InvestmentResponseDto.prototype, "actualReturn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "2025-08-10T00:00:00.000Z",
        description: "Actual return date (if completed)",
        required: false
    }),
    __metadata("design:type", String)
], InvestmentResponseDto.prototype, "actualReturnDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [
            "https://example.com/investment-contract.pdf",
            "https://example.com/project-prospectus.pdf"
        ],
        description: "Investment-related documents",
        required: false
    }),
    __metadata("design:type", Array)
], InvestmentResponseDto.prototype, "documents", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Investment made through referral program",
        description: "Additional notes about the investment",
        required: false
    }),
    __metadata("design:type", String)
], InvestmentResponseDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "2024-01-18T12:00:00.000Z",
        description: "Investment creation timestamp"
    }),
    __metadata("design:type", String)
], InvestmentResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "2024-01-18T12:00:00.000Z",
        description: "Last update timestamp"
    }),
    __metadata("design:type", String)
], InvestmentResponseDto.prototype, "updatedAt", void 0);
class UpdateInvestmentProjectDto {
    title;
    description;
    imageUrl;
    minimumInvestment;
    targetAmount;
    expectedROI;
    investmentDuration;
    location;
    highlights;
    completionDate;
}
exports.UpdateInvestmentProjectDto = UpdateInvestmentProjectDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Updated Luxury Downtown Apartment Complex",
        description: "Updated project title",
        required: false
    }),
    __metadata("design:type", String)
], UpdateInvestmentProjectDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Updated description with new features and timeline adjustments.",
        description: "Updated project description",
        required: false
    }),
    __metadata("design:type", String)
], UpdateInvestmentProjectDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "https://example.com/updated-project-image.jpg",
        description: "Updated project image URL",
        required: false
    }),
    __metadata("design:type", String)
], UpdateInvestmentProjectDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 12000,
        description: "Updated minimum investment amount",
        required: false
    }),
    __metadata("design:type", Number)
], UpdateInvestmentProjectDto.prototype, "minimumInvestment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 5500000,
        description: "Updated target amount",
        required: false
    }),
    __metadata("design:type", Number)
], UpdateInvestmentProjectDto.prototype, "targetAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 16.0,
        description: "Updated expected ROI percentage",
        required: false
    }),
    __metadata("design:type", Number)
], UpdateInvestmentProjectDto.prototype, "expectedROI", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "20 months",
        description: "Updated investment duration",
        required: false
    }),
    __metadata("design:type", String)
], UpdateInvestmentProjectDto.prototype, "investmentDuration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Downtown Manhattan, New York - Updated Location",
        description: "Updated project location",
        required: false
    }),
    __metadata("design:type", String)
], UpdateInvestmentProjectDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
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
    }),
    __metadata("design:type", Array)
], UpdateInvestmentProjectDto.prototype, "highlights", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "2025-10-15T00:00:00.000Z",
        description: "Updated completion date",
        required: false
    }),
    __metadata("design:type", String)
], UpdateInvestmentProjectDto.prototype, "completionDate", void 0);
//# sourceMappingURL=investment-response.dto.js.map