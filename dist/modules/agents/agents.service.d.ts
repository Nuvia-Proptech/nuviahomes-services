import type { Model } from "mongoose";
import { AgentProfile } from "./schemas/agent-profile.schema";
import { AgentRequest } from "./schemas/agent-request.schema";
import { AgentUpgradeRequestDto } from "./dto/agent-upgrade-request.dto";
import { AgentApprovalDto } from "./dto/agent-approval.dto";
export declare class AgentsService {
    private readonly agentProfileModel;
    private readonly agentRequestModel;
    constructor(agentProfileModel: Model<AgentProfile>, agentRequestModel: Model<AgentRequest>);
    createProfile(userId: string): Promise<import("mongoose").Document<unknown, {}, AgentProfile, {}, {}> & AgentProfile & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getProfile(userId: string): Promise<import("mongoose").Document<unknown, {}, AgentProfile, {}, {}> & AgentProfile & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateProfile(userId: string, updateDto: any): Promise<import("mongoose").Document<unknown, {}, AgentProfile, {}, {}> & AgentProfile & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getAllAgents(): Promise<(import("mongoose").Document<unknown, {}, AgentProfile, {}, {}> & AgentProfile & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    incrementPropertiesListed(userId: string): Promise<(import("mongoose").Document<unknown, {}, AgentProfile, {}, {}> & AgentProfile & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    incrementPropertySales(userId: string): Promise<(import("mongoose").Document<unknown, {}, AgentProfile, {}, {}> & AgentProfile & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    updateAverageRating(userId: string, newRating: number): Promise<(import("mongoose").Document<unknown, {}, AgentProfile, {}, {}> & AgentProfile & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    submitUpgradeRequest(userId: string, upgradeRequestDto: AgentUpgradeRequestDto): Promise<import("mongoose").Document<unknown, {}, AgentRequest, {}, {}> & AgentRequest & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getUpgradeRequests(status?: 'pending' | 'approved' | 'rejected'): Promise<(import("mongoose").Document<unknown, {}, AgentRequest, {}, {}> & AgentRequest & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getUserUpgradeRequest(userId: string): Promise<(import("mongoose").Document<unknown, {}, AgentRequest, {}, {}> & AgentRequest & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    processUpgradeRequest(requestId: string, approvalDto: AgentApprovalDto, adminId: string): Promise<(import("mongoose").Document<unknown, {}, AgentRequest, {}, {}> & AgentRequest & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    deleteUpgradeRequest(requestId: string): Promise<(import("mongoose").Document<unknown, {}, AgentRequest, {}, {}> & AgentRequest & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
}
