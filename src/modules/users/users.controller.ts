import { Controller, Get, Body, Patch, Param, Delete, UseGuards, Query, Post } from "@nestjs/common"
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from "@nestjs/swagger"
import { UsersService } from "./users.service"
import type { UpdateUserDto } from "./dto/update-user.dto"
import { ChangeRoleDto } from "./dto/change-role.dto"
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

  @Post('request-role-change')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ 
    summary: "Request role change from user to agent or property owner",
    description: "Allows regular users to request a role change to become an agent or property owner"
  })
  @ApiBody({ 
    type: ChangeRoleDto,
    examples: {
      agent: {
        summary: "Request Agent Role",
        description: "Request to become a real estate agent",
        value: {
          newRole: "agent",
          reason: "I have 5 years of real estate experience and want to help clients buy and sell properties"
        }
      },
      propertyOwner: {
        summary: "Request Property Owner Role",
        description: "Request to become a property owner",
        value: {
          newRole: "property_owner",
          reason: "I own multiple properties and want to list them on the platform"
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: "Role change request successful",
    schema: {
      type: "object",
      properties: {
        message: { type: "string", example: "Role successfully changed to agent" },
        user: { type: "object", description: "Updated user object" }
      }
    }
  })
  @ApiResponse({ status: 400, description: "Bad request - User not eligible for role change" })
  @ApiResponse({ status: 404, description: "User not found" })
  async requestRoleChange(@Body() changeRoleDto: ChangeRoleDto, @CurrentUser() currentUser: any) {
    return this.usersService.requestRoleChange(currentUser.id, changeRoleDto);
  }

  @Post(':id/change-role')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiOperation({ 
    summary: "Change user role (Admin only)",
    description: "Allows admins to change any user's role"
  })
  @ApiParam({ name: "id", description: "User ID" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        newRole: {
          type: "string",
          enum: Object.values(UserRole),
          example: UserRole.AGENT,
          description: "New role for the user"
        }
      },
      required: ["newRole"]
    },
    examples: {
      makeAgent: {
        summary: "Make User an Agent",
        description: "Change user role to agent",
        value: { newRole: "agent" }
      },
      makePropertyOwner: {
        summary: "Make User a Property Owner",
        description: "Change user role to property owner",
        value: { newRole: "property_owner" }
      },
      makeInvestor: {
        summary: "Make User an Investor",
        description: "Change user role to investor",
        value: { newRole: "investor" }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: "User role changed successfully",
    schema: {
      type: "object",
      properties: {
        message: { type: "string", example: "User role successfully changed to agent" },
        user: { type: "object", description: "Updated user object" }
      }
    }
  })
  @ApiResponse({ status: 400, description: "Bad request - Cannot change super admin role" })
  @ApiResponse({ status: 403, description: "Forbidden - Admin access required" })
  @ApiResponse({ status: 404, description: "User not found" })
  async changeUserRole(
    @Param('id') id: string, 
    @Body('newRole') newRole: UserRole, 
    @CurrentUser() currentUser: any
  ) {
    return this.usersService.changeUserRole(id, newRole, currentUser.id);
  }
}
