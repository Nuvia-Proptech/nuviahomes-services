"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const file_upload_service_1 = require("./file-upload.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let FileUploadController = class FileUploadController {
    fileUploadService;
    constructor(fileUploadService) {
        this.fileUploadService = fileUploadService;
    }
    async uploadSingle(file, folder = "general") {
        return this.fileUploadService.uploadFile(file, folder);
    }
    async uploadMultiple(files, folder = "general") {
        return this.fileUploadService.uploadMultipleFiles(files, folder);
    }
    async deleteFile(filepath) {
        return this.fileUploadService.deleteFile(filepath);
    }
};
exports.FileUploadController = FileUploadController;
__decorate([
    (0, common_1.Post)("single"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file")),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                file: {
                    type: "string",
                    format: "binary",
                },
                folder: {
                    type: "string",
                    default: "general",
                },
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FileUploadController.prototype, "uploadSingle", null);
__decorate([
    (0, common_1.Post)("multiple"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("files", 10)),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                files: {
                    type: "array",
                    items: {
                        type: "string",
                        format: "binary",
                    },
                },
                folder: {
                    type: "string",
                    default: "general",
                },
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], FileUploadController.prototype, "uploadMultiple", null);
__decorate([
    (0, common_1.Delete)(':filepath'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('filepath')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FileUploadController.prototype, "deleteFile", null);
exports.FileUploadController = FileUploadController = __decorate([
    (0, swagger_1.ApiTags)("File Upload"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)("upload"),
    __metadata("design:paramtypes", [file_upload_service_1.FileUploadService])
], FileUploadController);
//# sourceMappingURL=file-upload.controller.js.map