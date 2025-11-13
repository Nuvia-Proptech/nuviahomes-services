"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadService = void 0;
const common_1 = require("@nestjs/common");
const fs = __importStar(require("fs/promises"));
const fsSync = __importStar(require("fs"));
const path = __importStar(require("path"));
let FileUploadService = class FileUploadService {
    uploadDir = "uploads";
    constructor() {
        if (!fsSync.existsSync(this.uploadDir)) {
            fsSync.mkdirSync(this.uploadDir, { recursive: true });
        }
    }
    async uploadFile(file, folder = "general") {
        if (!file) {
            throw new common_1.BadRequestException("No file provided");
        }
        const allowedMimes = ["image/jpeg", "image/png", "image/gif", "application/pdf"];
        if (!allowedMimes.includes(file.mimetype)) {
            throw new common_1.BadRequestException("Invalid file type. Only JPEG, PNG, GIF, and PDF are allowed");
        }
        const maxFileSize = 5 * 1024 * 1024;
        if (file.size > maxFileSize) {
            throw new common_1.BadRequestException("File size exceeds 5MB limit");
        }
        try {
            const folderPath = path.join(this.uploadDir, folder);
            if (!fsSync.existsSync(folderPath)) {
                await fs.mkdir(folderPath, { recursive: true });
            }
            const timestamp = Date.now();
            const filename = `${timestamp}-${file.originalname}`;
            const filepath = path.join(folderPath, filename);
            await fs.writeFile(filepath, file.buffer);
            return {
                filename,
                filepath: `/uploads/${folder}/${filename}`,
                size: file.size,
                mimetype: file.mimetype,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException("Failed to upload file");
        }
    }
    async uploadMultipleFiles(files, folder = "general") {
        if (!files || files.length === 0) {
            throw new common_1.BadRequestException("No files provided");
        }
        const uploadedFiles = [];
        for (const file of files) {
            const result = await this.uploadFile(file, folder);
            uploadedFiles.push(result);
        }
        return uploadedFiles;
    }
    async deleteFile(filepath) {
        try {
            const fullPath = path.join(this.uploadDir, filepath.replace("/uploads/", ""));
            if (fsSync.existsSync(fullPath)) {
                await fs.unlink(fullPath);
                return { success: true, message: "File deleted successfully" };
            }
            throw new common_1.BadRequestException("File not found");
        }
        catch (error) {
            throw new common_1.BadRequestException("Failed to delete file");
        }
    }
};
exports.FileUploadService = FileUploadService;
exports.FileUploadService = FileUploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FileUploadService);
//# sourceMappingURL=file-upload.service.js.map