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
const wallet_response_dto_1 = require("./dto/wallet-response.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const error_response_dto_1 = require("../../common/dto/error-response.dto");
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
    async getWalletStats(req) {
        throw new Error("Method not implemented in service");
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
    async getTransactions(req, limit, skip, type, status) {
        return this.walletService.getTransactions(req.user.sub, limit, skip);
    }
    async getTransactionById(req, id) {
        return this.walletService.getTransactionById(req.user.sub, id);
    }
};
exports.WalletController = WalletController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: "Create a wallet for the authenticated user",
        description: "Create a new wallet for the currently authenticated user. Each user can only have one wallet."
    }),
    (0, swagger_1.ApiBody)({
        type: create_wallet_dto_1.CreateWalletDto,
        examples: {
            defaultWallet: {
                summary: "Default USD Wallet",
                description: "Create a wallet with default USD currency",
                value: {
                    currency: "USD"
                }
            },
            customCurrency: {
                summary: "Custom Currency Wallet",
                description: "Create a wallet with custom currency",
                value: {
                    currency: "EUR"
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Wallet created successfully",
        type: wallet_response_dto_1.WalletResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing JWT token",
        type: error_response_dto_1.UnauthorizedResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: "Wallet already exists for this user",
        type: error_response_dto_1.ErrorResponseDto
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_wallet_dto_1.CreateWalletDto]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "createWallet", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: "Get wallet details",
        description: "Retrieve wallet information for the currently authenticated user including current balance and status."
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Wallet details retrieved successfully",
        type: wallet_response_dto_1.WalletResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing JWT token",
        type: error_response_dto_1.UnauthorizedResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Wallet not found - User has no wallet",
        type: error_response_dto_1.NotFoundResponseDto
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "getWallet", null);
__decorate([
    (0, common_1.Get)("stats"),
    (0, swagger_1.ApiOperation)({
        summary: "Get wallet statistics",
        description: "Retrieve comprehensive statistics about the user's wallet including transaction summaries and balances."
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Wallet statistics retrieved successfully",
        type: wallet_response_dto_1.WalletStatsResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing JWT token",
        type: error_response_dto_1.UnauthorizedResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Wallet not found",
        type: error_response_dto_1.NotFoundResponseDto
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "getWalletStats", null);
__decorate([
    (0, common_1.Post)("deposit"),
    (0, swagger_1.ApiOperation)({
        summary: "Deposit funds into wallet",
        description: "Add funds to the user's wallet. The deposit will be processed and the wallet balance will be updated."
    }),
    (0, swagger_1.ApiBody)({
        type: deposit_dto_1.DepositDto,
        examples: {
            bankTransfer: {
                summary: "Bank Transfer Deposit",
                description: "Deposit funds via bank transfer",
                value: {
                    amount: 1000,
                    description: "Bank transfer deposit",
                    reference: "REF123456789"
                }
            },
            creditCard: {
                summary: "Credit Card Deposit",
                description: "Deposit funds via credit card",
                value: {
                    amount: 500,
                    description: "Credit card deposit",
                    reference: "CC987654321"
                }
            },
            investment: {
                summary: "Investment Return",
                description: "Deposit from investment returns",
                value: {
                    amount: 2500,
                    description: "Investment return from downtown project",
                    reference: "INV456789123"
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Deposit successful - Funds added to wallet",
        type: wallet_response_dto_1.TransactionResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing JWT token",
        type: error_response_dto_1.UnauthorizedResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Bad request - Invalid deposit amount or wallet inactive",
        type: error_response_dto_1.ErrorResponseDto
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, deposit_dto_1.DepositDto]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "deposit", null);
__decorate([
    (0, common_1.Post)("withdraw"),
    (0, swagger_1.ApiOperation)({
        summary: "Withdraw funds from wallet",
        description: "Withdraw funds from the user's wallet to their bank account. Requires sufficient balance."
    }),
    (0, swagger_1.ApiBody)({
        type: withdraw_dto_1.WithdrawDto,
        examples: {
            bankWithdrawal: {
                summary: "Bank Account Withdrawal",
                description: "Withdraw funds to bank account",
                value: {
                    amount: 500,
                    description: "Bank withdrawal to checking account"
                }
            },
            emergencyWithdrawal: {
                summary: "Emergency Withdrawal",
                description: "Emergency withdrawal of funds",
                value: {
                    amount: 1000,
                    description: "Emergency withdrawal - medical expenses"
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Withdrawal successful - Funds deducted from wallet",
        type: wallet_response_dto_1.TransactionResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing JWT token",
        type: error_response_dto_1.UnauthorizedResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Bad request - Insufficient balance or wallet inactive",
        type: error_response_dto_1.ErrorResponseDto
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, withdraw_dto_1.WithdrawDto]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "withdraw", null);
__decorate([
    (0, common_1.Post)("transfer"),
    (0, swagger_1.ApiOperation)({
        summary: "Transfer funds to another user",
        description: "Transfer funds from your wallet to another user's wallet. Both users must have active wallets."
    }),
    (0, swagger_1.ApiBody)({
        type: transfer_dto_1.TransferDto,
        examples: {
            servicePayment: {
                summary: "Service Payment",
                description: "Pay another user for services",
                value: {
                    recipientUserId: "507f1f77bcf86cd799439012",
                    amount: 250,
                    description: "Payment for consulting services"
                }
            },
            friendTransfer: {
                summary: "Friend Transfer",
                description: "Send money to a friend",
                value: {
                    recipientUserId: "507f1f77bcf86cd799439013",
                    amount: 100,
                    description: "Dinner split payment"
                }
            },
            investmentPayment: {
                summary: "Investment Payment",
                description: "Transfer for investment purposes",
                value: {
                    recipientUserId: "507f1f77bcf86cd799439014",
                    amount: 5000,
                    description: "Joint investment contribution"
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Transfer successful - Funds transferred to recipient",
        type: wallet_response_dto_1.TransactionResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing JWT token",
        type: error_response_dto_1.UnauthorizedResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Bad request - Insufficient balance, invalid recipient, or wallet inactive",
        type: error_response_dto_1.ErrorResponseDto
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, transfer_dto_1.TransferDto]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "transfer", null);
__decorate([
    (0, common_1.Get)("transactions"),
    (0, swagger_1.ApiOperation)({
        summary: "Get wallet transaction history",
        description: "Retrieve paginated transaction history for the user's wallet with optional filtering."
    }),
    (0, swagger_1.ApiQuery)({
        name: "limit",
        required: false,
        type: Number,
        example: 50,
        description: "Maximum number of transactions to return (default: 50)"
    }),
    (0, swagger_1.ApiQuery)({
        name: "skip",
        required: false,
        type: Number,
        example: 0,
        description: "Number of transactions to skip for pagination (default: 0)"
    }),
    (0, swagger_1.ApiQuery)({
        name: "type",
        required: false,
        enum: ["deposit", "withdrawal", "investment", "refund", "commission", "transfer"],
        description: "Filter by transaction type"
    }),
    (0, swagger_1.ApiQuery)({
        name: "status",
        required: false,
        enum: ["pending", "completed", "failed", "cancelled"],
        description: "Filter by transaction status"
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Transaction history retrieved successfully",
        type: wallet_response_dto_1.TransactionListResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing JWT token",
        type: error_response_dto_1.UnauthorizedResponseDto
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)("limit")),
    __param(2, (0, common_1.Query)("skip")),
    __param(3, (0, common_1.Query)("type")),
    __param(4, (0, common_1.Query)("status")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "getTransactions", null);
__decorate([
    (0, common_1.Get)("transactions/:id"),
    (0, swagger_1.ApiOperation)({
        summary: "Get transaction details by ID",
        description: "Retrieve detailed information about a specific transaction by its ID."
    }),
    (0, swagger_1.ApiParam)({
        name: "id",
        description: "Transaction unique identifier",
        example: "507f1f77bcf86cd799439017"
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Transaction details retrieved successfully",
        type: wallet_response_dto_1.TransactionResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized - Invalid or missing JWT token",
        type: error_response_dto_1.UnauthorizedResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Transaction not found or doesn't belong to user",
        type: error_response_dto_1.NotFoundResponseDto
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "getTransactionById", null);
exports.WalletController = WalletController = __decorate([
    (0, swagger_1.ApiTags)("Wallet"),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)("wallet"),
    __metadata("design:paramtypes", [wallet_service_1.WalletService])
], WalletController);
//# sourceMappingURL=wallet.controller.js.map