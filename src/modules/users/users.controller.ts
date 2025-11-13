import { Controller, Get, Body, Patch, Param, Delete, UseGuards, Query, Post } from "@nestjs/common"
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger"
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
  async findAll(@Query('role') role?: UserRole, @Query('isActive') isActive?: boolean) {
    return this.usersService.findAll(role, isActive)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
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
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post(":id/approve")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  async approveUser(@Param('id') id: string, @CurrentUser() currentUser: any) {
    return this.usersService.approveUser(id, currentUser.id)
  }

  @Post(':id/reject')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  async rejectUser(@Param('id') id: string) {
    return this.usersService.rejectUser(id);
  }
}
