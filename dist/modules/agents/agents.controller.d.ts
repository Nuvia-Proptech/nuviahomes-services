import { AgentsService } from "./agents.service";
import { AgentUpdateDto } from "./dto/agent-response.dto";
import { AgentUpgradeRequestDto } from "./dto/agent-upgrade-request.dto";
import { AgentApprovalDto } from "./dto/agent-approval.dto";
export declare class AgentsController {
    private readonly agentsService;
    constructor(agentsService: AgentsService);
    getAllAgents(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/agent-profile.schema").AgentProfile, {}, {}> & import("./schemas/agent-profile.schema").AgentProfile & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getProfile(userId: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/agent-profile.schema").AgentProfile, {}, {}> & import("./schemas/agent-profile.schema").AgentProfile & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getMyProfile(user: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/agent-profile.schema").AgentProfile, {}, {}> & import("./schemas/agent-profile.schema").AgentProfile & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateMyProfile(updateDto: AgentUpdateDto, user: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/agent-profile.schema").AgentProfile, {}, {}> & import("./schemas/agent-profile.schema").AgentProfile & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    submitUpgradeRequest(upgradeRequestDto: AgentUpgradeRequestDto, user: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/agent-request.schema").AgentRequest, {}, {}> & import("./schemas/agent-request.schema").AgentRequest & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getUpgradeRequests(status?: 'pending' | 'approved' | 'rejected'): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/agent-request.schema").AgentRequest, {}, {}> & import("./schemas/agent-request.schema").AgentRequest & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getMyUpgradeRequest(user: any): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/agent-request.schema").AgentRequest, {}, {}> & import("./schemas/agent-request.schema").AgentRequest & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    processUpgradeRequest(requestId: string, approvalDto: AgentApprovalDto, user: any): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/agent-request.schema").AgentRequest, {}, {}> & import("./schemas/agent-request.schema").AgentRequest & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
}
