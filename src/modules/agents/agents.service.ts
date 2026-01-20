import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import type { Model } from "mongoose"
import { AgentProfile } from "./schemas/agent-profile.schema"
import { AgentRequest } from "./schemas/agent-request.schema"
import { AgentUpgradeRequestDto } from "./dto/agent-upgrade-request.dto"
import { AgentApprovalDto } from "./dto/agent-approval.dto"

@Injectable()
export class AgentsService {
  constructor(
    @InjectModel(AgentProfile.name) private readonly agentProfileModel: Model<AgentProfile>,
    @InjectModel(AgentRequest.name) private readonly agentRequestModel: Model<AgentRequest>
  ) {}

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

  // Agent upgrade request methods
  async submitUpgradeRequest(userId: string, upgradeRequestDto: AgentUpgradeRequestDto) {
    // Check if user already has a pending request
    const existingRequest = await this.agentRequestModel.findOne({ 
      userId, 
      status: 'pending' 
    })

    if (existingRequest) {
      throw new BadRequestException('You already have a pending agent upgrade request')
    }

    // Check if user is already an agent
    const existingProfile = await this.agentProfileModel.findOne({ userId })
    if (existingProfile) {
      throw new BadRequestException('User is already an agent')
    }

    const request = new this.agentRequestModel({
      userId,
      ...upgradeRequestDto,
      status: 'pending'
    })

    return request.save()
  }

  async getUpgradeRequests(status?: 'pending' | 'approved' | 'rejected') {
    const filter = status ? { status } : {}
    return this.agentRequestModel
      .find(filter)
      .populate('userId', 'firstName lastName email phone profileImage')
      .populate('approvedBy', 'firstName lastName email')
      .sort({ createdAt: -1 })
  }

  async getUserUpgradeRequest(userId: string) {
    return this.agentRequestModel
      .findOne({ userId })
      .populate('userId', 'firstName lastName email phone profileImage')
      .populate('approvedBy', 'firstName lastName email')
      .sort({ createdAt: -1 })
  }

  async processUpgradeRequest(requestId: string, approvalDto: AgentApprovalDto, adminId: string) {
    const request = await this.agentRequestModel.findById(requestId)
    
    if (!request) {
      throw new NotFoundException('Agent upgrade request not found')
    }

    if (request.status !== 'pending') {
      throw new BadRequestException('Request has already been processed')
    }

    const updateData: any = {
      status: approvalDto.approved ? 'approved' : 'rejected',
      adminComments: approvalDto.adminComments,
      approvedBy: adminId,
      approvalDate: new Date()
    }

    const updatedRequest = await this.agentRequestModel.findByIdAndUpdate(
      requestId,
      updateData,
      { new: true }
    ).populate('userId', 'firstName lastName email phone profileImage')

    // If approved, create agent profile
    if (approvalDto.approved) {
      await this.createProfile(request.userId.toString())
    }

    return updatedRequest
  }

  async deleteUpgradeRequest(requestId: string) {
    const request = await this.agentRequestModel.findById(requestId)
    
    if (!request) {
      throw new NotFoundException('Agent upgrade request not found')
    }

    return this.agentRequestModel.findByIdAndDelete(requestId)
  }
}
