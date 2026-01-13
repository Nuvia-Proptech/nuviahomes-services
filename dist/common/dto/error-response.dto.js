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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedResponseDto = exports.NotFoundResponseDto = exports.ErrorResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ErrorResponseDto {
    statusCode;
    message;
    error;
}
exports.ErrorResponseDto = ErrorResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 400,
        description: "HTTP status code"
    }),
    __metadata("design:type", Number)
], ErrorResponseDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Bad Request",
        description: "Error message"
    }),
    __metadata("design:type", String)
], ErrorResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Bad Request",
        description: "Error type"
    }),
    __metadata("design:type", String)
], ErrorResponseDto.prototype, "error", void 0);
class NotFoundResponseDto {
    statusCode;
    message;
    error;
}
exports.NotFoundResponseDto = NotFoundResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 404,
        description: "HTTP status code"
    }),
    __metadata("design:type", Number)
], NotFoundResponseDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Resource not found",
        description: "Error message"
    }),
    __metadata("design:type", String)
], NotFoundResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Not Found",
        description: "Error type"
    }),
    __metadata("design:type", String)
], NotFoundResponseDto.prototype, "error", void 0);
class UnauthorizedResponseDto {
    statusCode;
    message;
    error;
}
exports.UnauthorizedResponseDto = UnauthorizedResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 401,
        description: "HTTP status code"
    }),
    __metadata("design:type", Number)
], UnauthorizedResponseDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Unauthorized",
        description: "Error message"
    }),
    __metadata("design:type", String)
], UnauthorizedResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Unauthorized",
        description: "Error type"
    }),
    __metadata("design:type", String)
], UnauthorizedResponseDto.prototype, "error", void 0);
//# sourceMappingURL=error-response.dto.js.map