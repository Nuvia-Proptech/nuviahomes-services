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
exports.InvestmentProjectSchema = exports.InvestmentProject = exports.ProjectStatus = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus["PLANNING"] = "planning";
    ProjectStatus["ACTIVE"] = "active";
    ProjectStatus["COMPLETED"] = "completed";
    ProjectStatus["CANCELLED"] = "cancelled";
})(ProjectStatus || (exports.ProjectStatus = ProjectStatus = {}));
let InvestmentProject = class InvestmentProject extends mongoose_2.Document {
    title;
    description;
    imageUrl;
    minimumInvestment;
    targetAmount;
    raisedAmount;
    expectedROI;
    investmentDuration;
    status;
    createdBy;
    location;
    highlights;
    completionDate;
    investorCount;
    isActive;
};
exports.InvestmentProject = InvestmentProject;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], InvestmentProject.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], InvestmentProject.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], InvestmentProject.prototype, "imageUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], InvestmentProject.prototype, "minimumInvestment", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], InvestmentProject.prototype, "targetAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], InvestmentProject.prototype, "raisedAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], InvestmentProject.prototype, "expectedROI", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], InvestmentProject.prototype, "investmentDuration", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: ProjectStatus.PLANNING, enum: ProjectStatus }),
    __metadata("design:type", String)
], InvestmentProject.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "User", required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], InvestmentProject.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], InvestmentProject.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String] }),
    __metadata("design:type", Array)
], InvestmentProject.prototype, "highlights", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], InvestmentProject.prototype, "completionDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], InvestmentProject.prototype, "investorCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], InvestmentProject.prototype, "isActive", void 0);
exports.InvestmentProject = InvestmentProject = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], InvestmentProject);
exports.InvestmentProjectSchema = mongoose_1.SchemaFactory.createForClass(InvestmentProject);
//# sourceMappingURL=investment-project.schema.js.map