import { AgentsService } from "./agents.service";
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
    updateMyProfile(updateDto: any, user: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/agent-profile.schema").AgentProfile, {}, {}> & import("./schemas/agent-profile.schema").AgentProfile & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
