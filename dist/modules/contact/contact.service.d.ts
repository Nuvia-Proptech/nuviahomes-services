import type { Model } from "mongoose";
import { ContactSubmission } from "./schemas/contact-submission.schema";
import type { SubmitContactDto } from "./dto/submit-contact.dto";
export declare class ContactService {
    private readonly contactModel;
    constructor(contactModel: Model<ContactSubmission>);
    submitContact(submitDto: SubmitContactDto, userId?: string): Promise<import("mongoose").Document<unknown, {}, ContactSubmission, {}, {}> & ContactSubmission & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getAllSubmissions(): Promise<(import("mongoose").Document<unknown, {}, ContactSubmission, {}, {}> & ContactSubmission & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getSubmissionById(id: string): Promise<import("mongoose").Document<unknown, {}, ContactSubmission, {}, {}> & ContactSubmission & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    markAsRead(id: string): Promise<import("mongoose").Document<unknown, {}, ContactSubmission, {}, {}> & ContactSubmission & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    respondToContact(id: string, response: string): Promise<import("mongoose").Document<unknown, {}, ContactSubmission, {}, {}> & ContactSubmission & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    deleteSubmission(id: string): Promise<{
        message: string;
    }>;
}
