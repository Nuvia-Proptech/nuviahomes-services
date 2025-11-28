import { Controller, Post, UseInterceptors, UseGuards, Delete, Param, UploadedFile, UploadedFiles, Body } from "@nestjs/common"
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express"
import { ApiTags, ApiBearerAuth, ApiConsumes, ApiBody, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger"
import { FileUploadService } from "./file-upload.service"
import type { UploadResponse } from "./file-upload.service"
import { JwtAuthGuard } from "@/modules/auth/guards/jwt-auth.guard"
import type { Express } from "express"

@ApiTags("File Upload")
@ApiBearerAuth()
@Controller("upload")
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post("single")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor("file"))
  @ApiOperation({ summary: "Upload a single file" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
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
  })
  @ApiResponse({ status: 201, description: "File uploaded successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async uploadSingle(@UploadedFile() file: Express.Multer.File, @Body('folder') folder = "general"): Promise<UploadResponse> {
    return this.fileUploadService.uploadFile(file, folder)
  }

  @Post("multiple")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor("files", 10))
  @ApiOperation({ summary: "Upload multiple files (max 10)" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
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
  })
  @ApiResponse({ status: 201, description: "Files uploaded successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async uploadMultiple(@UploadedFiles() files: Express.Multer.File[], @Body('folder') folder = "general"): Promise<UploadResponse[]> {
    return this.fileUploadService.uploadMultipleFiles(files, folder)
  }

  @Delete(':filepath')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Delete a file" })
  @ApiParam({ name: "filepath", description: "File path to delete" })
  @ApiResponse({ status: 200, description: "File deleted successfully" })
  @ApiResponse({ status: 404, description: "File not found" })
  async deleteFile(@Param('filepath') filepath: string): Promise<{ success: boolean; message: string }> {
    return this.fileUploadService.deleteFile(filepath)
  }
}
