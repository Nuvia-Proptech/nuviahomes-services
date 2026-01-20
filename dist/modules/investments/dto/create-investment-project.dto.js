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
exports.CreateInvestmentProjectDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateInvestmentProjectDto {
    title;
    description;
    imageUrl;
    minimumInvestment;
    targetAmount;
    expectedROI;
    investmentDuration;
    location;
    highlights;
}
exports.CreateInvestmentProjectDto = CreateInvestmentProjectDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Luxury Downtown Apartment Complex",
        description: "Project title"
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInvestmentProjectDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "A premium 50-unit apartment complex in the heart of downtown, featuring modern amenities, rooftop garden, and premium finishes. Expected completion in 18 months with guaranteed returns.",
        description: "Detailed project description"
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInvestmentProjectDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "https://example.com/project-main-image.jpg",
        description: "Project main image URL",
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInvestmentProjectDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 10000,
        description: "Minimum investment amount in USD"
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateInvestmentProjectDto.prototype, "minimumInvestment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 5000000,
        description: "Target funding amount in USD"
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateInvestmentProjectDto.prototype, "targetAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 15.5,
        description: "Expected return on investment percentage"
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateInvestmentProjectDto.prototype, "expectedROI", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "18 months",
        description: "Investment duration period",
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInvestmentProjectDto.prototype, "investmentDuration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Downtown Manhattan, New York",
        description: "Project location",
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInvestmentProjectDto.prototype, "location", void 0);
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
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateInvestmentProjectDto.prototype, "highlights", void 0);
//# sourceMappingURL=create-investment-project.dto.js.map