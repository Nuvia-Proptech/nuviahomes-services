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
exports.AgentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const agent_profile_schema_1 = require("./schemas/agent-profile.schema");
let AgentsService = class AgentsService {
    agentProfileModel;
    constructor(agentProfileModel) {
        this.agentProfileModel = agentProfileModel;
    }
    async createProfile(userId) {
        const profile = new this.agentProfileModel({ userId });
        return profile.save();
    }
    async getProfile(userId) {
        const profile = await this.agentProfileModel
            .findOne({ userId })
            .populate("userId", "firstName lastName email phone profileImage company socialLinks");
        if (!profile) {
            throw new common_1.NotFoundException("Agent profile not found");
        }
        return profile;
    }
    async updateProfile(userId, updateDto) {
        const profile = await this.agentProfileModel.findOneAndUpdate({ userId }, updateDto, { new: true });
        if (!profile) {
            throw new common_1.NotFoundException("Agent profile not found");
        }
        return profile;
    }
    async getAllAgents() {
        return this.agentProfileModel
            .find()
            .populate("userId", "firstName lastName email phone profileImage company")
            .sort({ averageRating: -1 });
    }
    async incrementPropertiesListed(userId) {
        return this.agentProfileModel.findOneAndUpdate({ userId }, { $inc: { totalPropertiesListed: 1 } }, { new: true });
    }
    async incrementPropertySales(userId) {
        return this.agentProfileModel.findOneAndUpdate({ userId }, { $inc: { totalPropertySales: 1 } }, { new: true });
    }
    async updateAverageRating(userId, newRating) {
        return this.agentProfileModel.findOneAndUpdate({ userId }, { averageRating: newRating }, { new: true });
    }
};
exports.AgentsService = AgentsService;
exports.AgentsService = AgentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(agent_profile_schema_1.AgentProfile.name)),
    __metadata("design:paramtypes", [Function])
], AgentsService);
//# sourceMappingURL=agents.service.js.map