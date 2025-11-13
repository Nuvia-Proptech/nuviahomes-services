import { ContactService } from "./contact.service";
import type { SubmitContactDto } from "./dto/submit-contact.dto";
export declare class ContactController {
    private readonly contactService;
    constructor(contactService: ContactService);
    submitContact(submitContactDto: SubmitContactDto, currentUser?: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/contact-submission.schema").ContactSubmission, {}, {}> & import("./schemas/contact-submission.schema").ContactSubmission & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getAllSubmissions(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/contact-submission.schema").ContactSubmission, {}, {}> & import("./schemas/contact-submission.schema").ContactSubmission & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getSubmissionById(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/contact-submission.schema").ContactSubmission, {}, {}> & import("./schemas/contact-submission.schema").ContactSubmission & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    markAsRead(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/contact-submission.schema").ContactSubmission, {}, {}> & import("./schemas/contact-submission.schema").ContactSubmission & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    respondToContact(id: string, body: {
        response: string;
    }): Promise<import("mongoose").Document<unknown, {}, import("./schemas/contact-submission.schema").ContactSubmission, {}, {}> & import("./schemas/contact-submission.schema").ContactSubmission & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    deleteSubmission(id: string): Promise<{
        message: string;
    }>;
}
