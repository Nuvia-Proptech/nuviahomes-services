export interface UploadResponse {
    filename: string;
    filepath: string;
    size: number;
    mimetype: string;
}
export declare class FileUploadService {
    private uploadDir;
    constructor();
    uploadFile(file: Express.Multer.File, folder?: string): Promise<UploadResponse>;
    uploadMultipleFiles(files: Express.Multer.File[], folder?: string): Promise<UploadResponse[]>;
    deleteFile(filepath: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
