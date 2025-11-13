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
exports.InvestmentSchema = exports.Investment = exports.InvestmentStatus = exports.InvestmentType = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var InvestmentType;
(function (InvestmentType) {
    InvestmentType["PROPERTY"] = "property";
    InvestmentType["PROJECT"] = "project";
})(InvestmentType || (exports.InvestmentType = InvestmentType = {}));
var InvestmentStatus;
(function (InvestmentStatus) {
    InvestmentStatus["PENDING"] = "pending";
    InvestmentStatus["ACTIVE"] = "active";
    InvestmentStatus["COMPLETED"] = "completed";
    InvestmentStatus["WITHDRAWN"] = "withdrawn";
})(InvestmentStatus || (exports.InvestmentStatus = InvestmentStatus = {}));
let Investment = class Investment extends mongoose_2.Document {
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
};
exports.Investment = Investment;
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: InvestmentType }),
    __metadata("design:type", String)
], Investment.prototype, "investmentType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "Property" }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Investment.prototype, "propertyId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "InvestmentProject" }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Investment.prototype, "projectId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "User", required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Investment.prototype, "investorId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Investment.prototype, "amount", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Investment.prototype, "shares", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: InvestmentStatus.PENDING, enum: InvestmentStatus }),
    __metadata("design:type", String)
], Investment.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Investment.prototype, "expectedReturn", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Investment.prototype, "expectedReturnDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Investment.prototype, "actualReturn", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Investment.prototype, "actualReturnDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Investment.prototype, "documents", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Investment.prototype, "notes", void 0);
exports.Investment = Investment = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Investment);
exports.InvestmentSchema = mongoose_1.SchemaFactory.createForClass(Investment);
//# sourceMappingURL=investment.schema.js.map