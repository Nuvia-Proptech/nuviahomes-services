import { Controller, Get, Body, Patch, Param, Delete, UseGuards, Query, Post } from "@nestjs/common"
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam, ApiQuery } from "@nestjs/swagger"
import { UsersService } from "./users.service"
import type { UpdateUserDto } from "./dto/update-user.dto"
import { JwtAuthGuard } from "@/modules/auth/guards/jwt-auth.guard"
import { RolesGuard } from "@/modules/auth/guards/roles.guard"
import { Roles } from "@/modules/auth/decorators/roles.decorator"
import { CurrentUser } from "@/modules/auth/decorators/current-user.decorator"
import { UserRole } from "@/common/enums/user-role.enum"

@ApiTags("Users")
@ApiBearerAuth()
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiOperation({ summary: "Get all users (Admin only)" })
  @ApiQuery({ name: "role", required: false, enum: UserRole, description: "Filter by user role" })
  @ApiQuery({ name: "isActive", required: false, type: Boolean, description: "Filter by active status" })
  @ApiResponse({ status: 200, description: "Returns list of users" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  async findAll(@Query('role') role?: UserRole, @Query('isActive') isActive?: boolean) {
    return this.usersService.findAll(role, isActive)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Get user by ID" })
  @ApiParam({ name: "id", description: "User ID" })
  @ApiResponse({ status: 200, description: "Returns user details" })
  @ApiResponse({ status: 404, description: "User not found" })
  async findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Update user profile" })
  @ApiParam({ name: "id", description: "User ID" })
  @ApiResponse({ status: 200, description: "User updated successfully" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @CurrentUser() currentUser: any) {
    // Users can only update their own profile, admins can update any
    if (currentUser.id !== id && currentUser.role !== UserRole.SUPER_ADMIN) {
      throw new Error("Unauthorized")
    }
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: "Delete user (Super Admin only)" })
  @ApiParam({ name: "id", description: "User ID" })
  @ApiResponse({ status: 200, description: "User deleted successfully" })
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post(":id/approve")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: "Approve user (Super Admin only)" })
  @ApiParam({ name: "id", description: "User ID" })
  @ApiResponse({ status: 200, description: "User approved successfully" })
  async approveUser(@Param('id') id: string, @CurrentUser() currentUser: any) {
    return this.usersService.approveUser(id, currentUser.id)
  }

  @Post(':id/reject')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: "Reject user (Super Admin only)" })
  @ApiParam({ name: "id", description: "User ID" })
  @ApiResponse({ status: 200, description: "User rejected successfully" })
  async rejectUser(@Param('id') id: string) {
    return this.usersService.rejectUser(id);
  }
}
