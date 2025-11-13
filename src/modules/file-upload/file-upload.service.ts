import { Injectable, BadRequestException } from "@nestjs/common"
import * as fs from "fs/promises"
import * as fsSync from "fs"
import * as path from "path"
import type { Express } from "express"

export interface UploadResponse {
  filename: string
  filepath: string
  size: number
  mimetype: string
}

@Injectable()
export class FileUploadService {
  private uploadDir = "uploads"

  constructor() {
    if (!fsSync.existsSync(this.uploadDir)) {
      fsSync.mkdirSync(this.uploadDir, { recursive: true })
    }
  }

  async uploadFile(file: Express.Multer.File, folder = "general"): Promise<UploadResponse> {
    if (!file) {
      throw new BadRequestException("No file provided")
    }

    // Validate file type
    const allowedMimes = ["image/jpeg", "image/png", "image/gif", "application/pdf"]
    if (!allowedMimes.includes(file.mimetype)) {
      throw new BadRequestException("Invalid file type. Only JPEG, PNG, GIF, and PDF are allowed")
    }

    // Validate file size (5MB max)
    const maxFileSize = 5 * 1024 * 1024
    if (file.size > maxFileSize) {
      throw new BadRequestException("File size exceeds 5MB limit")
    }

    try {
      const folderPath = path.join(this.uploadDir, folder)
      if (!fsSync.existsSync(folderPath)) {
        await fs.mkdir(folderPath, { recursive: true })
      }

      const timestamp = Date.now()
      const filename = `${timestamp}-${file.originalname}`
      const filepath = path.join(folderPath, filename)

      await fs.writeFile(filepath, file.buffer)

      return {
        filename,
        filepath: `/uploads/${folder}/${filename}`,
        size: file.size,
        mimetype: file.mimetype,
      }
    } catch (error) {
      throw new BadRequestException("Failed to upload file")
    }
  }

  async uploadMultipleFiles(files: Express.Multer.File[], folder = "general"): Promise<UploadResponse[]> {
    if (!files || files.length === 0) {
      throw new BadRequestException("No files provided")
    }

    const uploadedFiles: UploadResponse[] = []
    for (const file of files) {
      const result = await this.uploadFile(file, folder)
      uploadedFiles.push(result)
    }

    return uploadedFiles
  }

  async deleteFile(filepath: string): Promise<{ success: boolean; message: string }> {
    try {
      const fullPath = path.join(this.uploadDir, filepath.replace("/uploads/", ""))
      if (fsSync.existsSync(fullPath)) {
        await fs.unlink(fullPath)
        return { success: true, message: "File deleted successfully" }
      }
      throw new BadRequestException("File not found")
    } catch (error) {
      throw new BadRequestException("Failed to delete file")
    }
  }
}
