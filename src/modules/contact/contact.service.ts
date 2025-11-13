import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import type { Model } from "mongoose"
import { ContactSubmission } from "./schemas/contact-submission.schema"
import type { SubmitContactDto } from "./dto/submit-contact.dto"

@Injectable()
export class ContactService {
  constructor(@InjectModel(ContactSubmission.name) private readonly contactModel: Model<ContactSubmission>) {}

  async submitContact(submitDto: SubmitContactDto, userId?: string) {
    const contact = new this.contactModel({
      ...submitDto,
      userId,
    })

    return contact.save()
  }

  async getAllSubmissions() {
    return this.contactModel.find().populate("userId", "firstName lastName email").sort({ createdAt: -1 })
  }

  async getSubmissionById(id: string) {
    const submission = await this.contactModel.findById(id)
    if (!submission) {
      throw new NotFoundException("Contact submission not found")
    }
    return submission
  }

  async markAsRead(id: string) {
    const submission = await this.contactModel.findByIdAndUpdate(id, { isRead: true }, { new: true })

    if (!submission) {
      throw new NotFoundException("Contact submission not found")
    }

    return submission
  }

  async respondToContact(id: string, response: string) {
    const submission = await this.contactModel.findByIdAndUpdate(
      id,
      {
        response,
        respondedAt: new Date(),
      },
      { new: true },
    )

    if (!submission) {
      throw new NotFoundException("Contact submission not found")
    }

    return submission
  }

  async deleteSubmission(id: string) {
    const submission = await this.contactModel.findByIdAndDelete(id)
    if (!submission) {
      throw new NotFoundException("Contact submission not found")
    }

    return { message: "Contact submission deleted" }
  }
}
