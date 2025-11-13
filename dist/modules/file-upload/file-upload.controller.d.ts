import { FileUploadService } from "./file-upload.service";
import type { UploadResponse } from "./file-upload.service";
export declare class FileUploadController {
    private readonly fileUploadService;
    constructor(fileUploadService: FileUploadService);
    uploadSingle(file: Express.Multer.File, folder?: string): Promise<UploadResponse>;
    uploadMultiple(files: Express.Multer.File[], folder?: string): Promise<UploadResponse[]>;
    deleteFile(filepath: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
