import { Injectable, ConflictException, NotFoundException, BadRequestException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import type { Model } from "mongoose"
import * as bcrypt from "bcryptjs"
import { User } from "./schemas/user.schema"
import type { CreateUserDto } from "./dto/create-user.dto"
import type { UpdateUserDto } from "./dto/update-user.dto"
import { ChangeRoleDto } from "./dto/change-role.dto"
import { UserRole } from "@/common/enums/user-role.enum"

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto, createdBy?: string) {
    const existingUser = await this.userModel.findOne({ email: createUserDto.email })
    if (existingUser) {
      throw new ConflictException("User with this email already exists")
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10)
    const user = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
      createdBy,
    })

    return user.save()
  }

  async findAll(role?: UserRole, isActive?: boolean) {
    const filter: any = {}
    if (role) filter.role = role
    if (isActive !== undefined) filter.isActive = isActive
    return this.userModel.find(filter).select("-password")
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id).select("-password")
    if (!user) {
      throw new NotFoundException("User not found")
    }
    return user
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email })
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).select("-password")

    if (!user) {
      throw new NotFoundException("User not found")
    }

    return user
  }

  async remove(id: string) {
    const user = await this.userModel.findByIdAndDelete(id)
    if (!user) {
      throw new NotFoundException("User not found")
    }
    return { message: "User deleted successfully" }
  }

  async changePassword(id: string, oldPassword: string, newPassword: string) {
    const user = await this.userModel.findById(id)
    if (!user) {
      throw new NotFoundException("User not found")
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password)
    if (!isPasswordValid) {
      throw new ConflictException("Old password is incorrect")
    }

    user.password = await bcrypt.hash(newPassword, 10)
    return user.save()
  }

  async approveUser(userId: string, approvedBy: string) {
    const user = await this.userModel
      .findByIdAndUpdate(
        userId,
        {
          isVerified: true,
          approvedBy,
          approvalDate: new Date(),
        },
        { new: true },
      )
      .select("-password")

    if (!user) {
      throw new NotFoundException("User not found")
    }

    return user
  }

  async rejectUser(userId: string) {
    const user = await this.userModel.findByIdAndUpdate(userId, { isActive: false }, { new: true }).select("-password")

    if (!user) {
      throw new NotFoundException("User not found")
    }

    return user
  }

  async requestRoleChange(userId: string, changeRoleDto: ChangeRoleDto) {
    const user = await this.userModel.findById(userId)
    if (!user) {
      throw new NotFoundException("User not found")
    }

    // Check if user is currently a regular user
    if (user.role !== UserRole.USER) {
      throw new BadRequestException("Only regular users can request role changes")
    }

    // For now, we'll directly change the role. In a real application, 
    // you might want to create a role change request system with approval workflow
    const updatedUser = await this.userModel
      .findByIdAndUpdate(
        userId,
        { 
          role: changeRoleDto.newRole,
          // Reset verification status for role changes if needed
          // isVerified: false 
        },
        { new: true }
      )
      .select("-password")

    return {
      message: `Role successfully changed to ${changeRoleDto.newRole}`,
      user: updatedUser
    }
  }

  async changeUserRole(userId: string, newRole: UserRole, adminId: string) {
    const user = await this.userModel.findById(userId)
    if (!user) {
      throw new NotFoundException("User not found")
    }

    // Prevent changing super admin role
    if (user.role === UserRole.SUPER_ADMIN) {
      throw new BadRequestException("Cannot change super admin role")
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(
        userId,
        { 
          role: newRole,
          approvedBy: adminId,
          approvalDate: new Date()
        },
        { new: true }
      )
      .select("-password")

    return {
      message: `User role successfully changed to ${newRole}`,
      user: updatedUser
    }
  }
}
