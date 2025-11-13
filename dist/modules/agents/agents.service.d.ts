import type { Model } from "mongoose";
import { AgentProfile } from "./schemas/agent-profile.schema";
export declare class AgentsService {
    private readonly agentProfileModel;
    constructor(agentProfileModel: Model<AgentProfile>);
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
}
