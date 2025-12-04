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
exports.WalletController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const wallet_service_1 = require("./wallet.service");
const create_wallet_dto_1 = require("./dto/create-wallet.dto");
const deposit_dto_1 = require("./dto/deposit.dto");
const withdraw_dto_1 = require("./dto/withdraw.dto");
const transfer_dto_1 = require("./dto/transfer.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let WalletController = class WalletController {
    walletService;
    constructor(walletService) {
        this.walletService = walletService;
    }
    async createWallet(req, createWalletDto) {
        return this.walletService.createWallet(req.user.sub, createWalletDto);
    }
    async getWallet(req) {
        return this.walletService.getWallet(req.user.sub);
    }
    async deposit(req, depositDto) {
        return this.walletService.deposit(req.user.sub, depositDto);
    }
    async withdraw(req, withdrawDto) {
        return this.walletService.withdraw(req.user.sub, withdrawDto);
    }
    async transfer(req, transferDto) {
        return this.walletService.transfer(req.user.sub, transferDto);
    }
    async getTransactions(req, limit, skip) {
        return this.walletService.getTransactions(req.user.sub, limit, skip);
    }
    async getTransactionById(req, id) {
        return this.walletService.getTransactionById(req.user.sub, id);
    }
};
exports.WalletController = WalletController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Create a wallet for the authenticated user" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "Wallet created successfully" }),
    (0, swagger_1.ApiResponse)({ status: 409, description: "Wallet already exists" }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_wallet_dto_1.CreateWalletDto]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "createWallet", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get wallet details" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Wallet details retrieved" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Wallet not found" }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "getWallet", null);
__decorate([
    (0, common_1.Post)("deposit"),
    (0, swagger_1.ApiOperation)({ summary: "Deposit funds into wallet" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Deposit successful" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad request" }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, deposit_dto_1.DepositDto]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "deposit", null);
__decorate([
    (0, common_1.Post)("withdraw"),
    (0, swagger_1.ApiOperation)({ summary: "Withdraw funds from wallet" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Withdrawal successful" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Insufficient balance or wallet inactive" }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, withdraw_dto_1.WithdrawDto]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "withdraw", null);
__decorate([
    (0, common_1.Post)("transfer"),
    (0, swagger_1.ApiOperation)({ summary: "Transfer funds to another user" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Transfer successful" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Insufficient balance or invalid recipient" }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, transfer_dto_1.TransferDto]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "transfer", null);
__decorate([
    (0, common_1.Get)("transactions"),
    (0, swagger_1.ApiOperation)({ summary: "Get wallet transaction history" }),
    (0, swagger_1.ApiQuery)({ name: "limit", required: false, type: Number, example: 50 }),
    (0, swagger_1.ApiQuery)({ name: "skip", required: false, type: Number, example: 0 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Transactions retrieved" }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)("limit")),
    __param(2, (0, common_1.Query)("skip")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "getTransactions", null);
__decorate([
    (0, common_1.Get)("transactions/:id"),
    (0, swagger_1.ApiOperation)({ summary: "Get transaction details by ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Transaction details retrieved" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Transaction not found" }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "getTransactionById", null);
exports.WalletController = WalletController = __decorate([
    (0, swagger_1.ApiTags)("Wallet"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)("wallet"),
    __metadata("design:paramtypes", [wallet_service_1.WalletService])
], WalletController);
//# sourceMappingURL=wallet.controller.js.map