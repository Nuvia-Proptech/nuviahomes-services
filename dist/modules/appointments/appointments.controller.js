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
exports.AppointmentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const appointments_service_1 = require("./appointments.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
let AppointmentsController = class AppointmentsController {
    appointmentsService;
    constructor(appointmentsService) {
        this.appointmentsService = appointmentsService;
    }
    async create(createAppointmentDto, user) {
        return this.appointmentsService.create(createAppointmentDto, user.id);
    }
    async getUpcomingAppointments(user) {
        return this.appointmentsService.getUpcomingAppointments(user.id);
    }
    async getAgentAppointments(user, status) {
        return this.appointmentsService.getAgentAppointments(user.id, status);
    }
    async getUserAppointments(user, status) {
        return this.appointmentsService.getUserAppointments(user.id, status);
    }
    async getAppointmentById(id) {
        return this.appointmentsService.getAppointmentById(id);
    }
    async updateStatus(id, updateDto, user) {
        return this.appointmentsService.updateStatus(id, updateDto, user.id);
    }
    async addAgentNotes(id, notes, user) {
        return this.appointmentsService.addAgentNotes(id, notes, user.id);
    }
    async cancel(id, user) {
        return this.appointmentsService.cancel(id, user.id);
    }
};
exports.AppointmentsController = AppointmentsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: "Create a new appointment" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "Appointment created successfully" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized" }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Object]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("agent/upcoming"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: "Get upcoming appointments for agent" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Returns upcoming appointments" }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "getUpcomingAppointments", null);
__decorate([
    (0, common_1.Get)("agent"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: "Get all appointments for agent" }),
    (0, swagger_1.ApiQuery)({ name: "status", required: false, description: "Filter by appointment status" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Returns agent appointments" }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "getAgentAppointments", null);
__decorate([
    (0, common_1.Get)("user"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: "Get all appointments for user" }),
    (0, swagger_1.ApiQuery)({ name: "status", required: false, description: "Filter by appointment status" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Returns user appointments" }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "getUserAppointments", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: "Get appointment by ID" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Appointment ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Returns appointment details" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Appointment not found" }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "getAppointmentById", null);
__decorate([
    (0, common_1.Patch)(":id/status"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: "Update appointment status" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Appointment ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Status updated successfully" }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function, Object]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Post)(":id/notes"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: "Add agent notes to appointment" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Appointment ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Notes added successfully" }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('notes')),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "addAgentNotes", null);
__decorate([
    (0, common_1.Post)(":id/cancel"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: "Cancel appointment" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Appointment ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Appointment cancelled successfully" }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "cancel", null);
exports.AppointmentsController = AppointmentsController = __decorate([
    (0, swagger_1.ApiTags)("Appointments"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)("appointments"),
    __metadata("design:paramtypes", [appointments_service_1.AppointmentsService])
], AppointmentsController);
//# sourceMappingURL=appointments.controller.js.map