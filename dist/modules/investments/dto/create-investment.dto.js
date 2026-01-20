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
exports.CreateInvestmentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const investment_schema_1 = require("../schemas/investment.schema");
class CreateInvestmentDto {
    investmentType;
    propertyId;
    projectId;
    amount;
    shares;
    notes;
}
exports.CreateInvestmentDto = CreateInvestmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: investment_schema_1.InvestmentType.PROJECT,
        enum: investment_schema_1.InvestmentType,
        description: "Type of investment (property or project)"
    }),
    (0, class_validator_1.IsEnum)(investment_schema_1.InvestmentType),
    __metadata("design:type", String)
], CreateInvestmentDto.prototype, "investmentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "507f1f77bcf86cd799439013",
        description: "Property ID (required if investmentType is 'property')",
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInvestmentDto.prototype, "propertyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "507f1f77bcf86cd799439013",
        description: "Project ID (required if investmentType is 'project')",
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInvestmentDto.prototype, "projectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 25000,
        description: "Investment amount in USD"
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateInvestmentDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 100,
        description: "Number of shares (if applicable)",
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateInvestmentDto.prototype, "shares", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Investment made through referral program",
        description: "Additional notes about the investment",
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInvestmentDto.prototype, "notes", void 0);
//# sourceMappingURL=create-investment.dto.js.map