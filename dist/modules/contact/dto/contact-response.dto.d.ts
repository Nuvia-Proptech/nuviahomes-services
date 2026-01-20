export declare class ContactSubmissionResponseDto {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    userId?: string;
    isRead: boolean;
    response?: string;
    respondedAt?: string;
    createdAt: string;
    updatedAt: string;
}
export declare class ContactSubmissionStatsDto {
    totalSubmissions: number;
    unreadSubmissions: number;
    readSubmissions: number;
    respondedSubmissions: number;
    todaySubmissions: number;
    weekSubmissions: number;
}
export declare class RespondToContactDto {
    response: string;
}
