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
exports.AgentProfileSchema = exports.AgentProfile = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let AgentProfile = class AgentProfile extends mongoose_2.Document {
    userId;
    specialization;
    yearsOfExperience;
    licenseNumber;
    licenseExpiry;
    certifications;
    awards;
    totalPropertiesListed;
    totalPropertySales;
    averageRating;
    reviewCount;
    bankAccount;
    commission;
};
exports.AgentProfile = AgentProfile;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "User", required: true, unique: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], AgentProfile.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], AgentProfile.prototype, "specialization", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], AgentProfile.prototype, "yearsOfExperience", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], AgentProfile.prototype, "licenseNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], AgentProfile.prototype, "licenseExpiry", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String] }),
    __metadata("design:type", Array)
], AgentProfile.prototype, "certifications", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Array)
], AgentProfile.prototype, "awards", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], AgentProfile.prototype, "totalPropertiesListed", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], AgentProfile.prototype, "totalPropertySales", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], AgentProfile.prototype, "averageRating", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], AgentProfile.prototype, "reviewCount", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], AgentProfile.prototype, "bankAccount", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], AgentProfile.prototype, "commission", void 0);
exports.AgentProfile = AgentProfile = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], AgentProfile);
exports.AgentProfileSchema = mongoose_1.SchemaFactory.createForClass(AgentProfile);
//# sourceMappingURL=agent-profile.schema.js.map