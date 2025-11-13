import { Controller, Post, UseInterceptors, UseGuards, Delete, Param } from "@nestjs/common"
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express"
import { ApiTags, ApiBearerAuth, ApiConsumes, ApiBody } from "@nestjs/swagger"
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
  async uploadSingle(file: Express.Multer.File, folder = "general"): Promise<UploadResponse> {
    return this.fileUploadService.uploadFile(file, folder)
  }

  @Post("multiple")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor("files", 10))
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
  async uploadMultiple(files: Express.Multer.File[], folder = "general"): Promise<UploadResponse[]> {
    return this.fileUploadService.uploadMultipleFiles(files, folder)
  }

  @Delete(':filepath')
  @UseGuards(JwtAuthGuard)
  async deleteFile(@Param('filepath') filepath: string): Promise<{ success: boolean; message: string }> {
    return this.fileUploadService.deleteFile(filepath)
  }
}
