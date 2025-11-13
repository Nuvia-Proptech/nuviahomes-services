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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const contact_submission_schema_1 = require("./schemas/contact-submission.schema");
let ContactService = class ContactService {
    contactModel;
    constructor(contactModel) {
        this.contactModel = contactModel;
    }
    async submitContact(submitDto, userId) {
        const contact = new this.contactModel({
            ...submitDto,
            userId,
        });
        return contact.save();
    }
    async getAllSubmissions() {
        return this.contactModel.find().populate("userId", "firstName lastName email").sort({ createdAt: -1 });
    }
    async getSubmissionById(id) {
        const submission = await this.contactModel.findById(id);
        if (!submission) {
            throw new common_1.NotFoundException("Contact submission not found");
        }
        return submission;
    }
    async markAsRead(id) {
        const submission = await this.contactModel.findByIdAndUpdate(id, { isRead: true }, { new: true });
        if (!submission) {
            throw new common_1.NotFoundException("Contact submission not found");
        }
        return submission;
    }
    async respondToContact(id, response) {
        const submission = await this.contactModel.findByIdAndUpdate(id, {
            response,
            respondedAt: new Date(),
        }, { new: true });
        if (!submission) {
            throw new common_1.NotFoundException("Contact submission not found");
        }
        return submission;
    }
    async deleteSubmission(id) {
        const submission = await this.contactModel.findByIdAndDelete(id);
        if (!submission) {
            throw new common_1.NotFoundException("Contact submission not found");
        }
        return { message: "Contact submission deleted" };
    }
};
exports.ContactService = ContactService;
exports.ContactService = ContactService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(contact_submission_schema_1.ContactSubmission.name)),
    __metadata("design:paramtypes", [Function])
], ContactService);
//# sourceMappingURL=contact.service.js.map