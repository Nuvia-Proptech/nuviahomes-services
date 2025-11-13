import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import type { Model } from "mongoose"
import { AgentProfile } from "./schemas/agent-profile.schema"

@Injectable()
export class AgentsService {
  constructor(@InjectModel(AgentProfile.name) private readonly agentProfileModel: Model<AgentProfile>) {}

  async createProfile(userId: string) {
    const profile = new this.agentProfileModel({ userId })
    return profile.save()
  }

  async getProfile(userId: string) {
    const profile = await this.agentProfileModel
      .findOne({ userId })
      .populate("userId", "firstName lastName email phone profileImage company socialLinks")

    if (!profile) {
      throw new NotFoundException("Agent profile not found")
    }

    return profile
  }

  async updateProfile(userId: string, updateDto: any) {
    const profile = await this.agentProfileModel.findOneAndUpdate({ userId }, updateDto, { new: true })

    if (!profile) {
      throw new NotFoundException("Agent profile not found")
    }

    return profile
  }

  async getAllAgents() {
    return this.agentProfileModel
      .find()
      .populate("userId", "firstName lastName email phone profileImage company")
      .sort({ averageRating: -1 })
  }

  async incrementPropertiesListed(userId: string) {
    return this.agentProfileModel.findOneAndUpdate({ userId }, { $inc: { totalPropertiesListed: 1 } }, { new: true })
  }

  async incrementPropertySales(userId: string) {
    return this.agentProfileModel.findOneAndUpdate({ userId }, { $inc: { totalPropertySales: 1 } }, { new: true })
  }

  async updateAverageRating(userId: string, newRating: number) {
    return this.agentProfileModel.findOneAndUpdate({ userId }, { averageRating: newRating }, { new: true })
  }
}
