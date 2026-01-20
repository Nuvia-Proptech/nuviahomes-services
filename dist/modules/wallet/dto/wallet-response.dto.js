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
exports.TransferRecipientDto = exports.WalletStatsResponseDto = exports.TransactionListResponseDto = exports.TransactionResponseDto = exports.WalletResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const transaction_type_enum_1 = require("../../../common/enums/transaction-type.enum");
const transaction_status_enum_1 = require("../../../common/enums/transaction-status.enum");
class WalletResponseDto {
    _id;
    userId;
    balance;
    currency;
    isActive;
    createdAt;
    updatedAt;
}
exports.WalletResponseDto = WalletResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "507f1f77bcf86cd799439016",
        description: "Wallet's unique identifier"
    }),
    __metadata("design:type", String)
], WalletResponseDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "507f1f77bcf86cd799439011",
        description: "Owner's user ID"
    }),
    __metadata("design:type", String)
], WalletResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 15750.50,
        description: "Current wallet balance"
    }),
    __metadata("design:type", Number)
], WalletResponseDto.prototype, "balance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "USD",
        description: "Wallet currency"
    }),
    __metadata("design:type", String)
], WalletResponseDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: "Whether the wallet is active"
    }),
    __metadata("design:type", Boolean)
], WalletResponseDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "2024-01-15T10:30:00.000Z",
        description: "Wallet creation timestamp"
    }),
    __metadata("design:type", String)
], WalletResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "2024-01-20T14:45:00.000Z",
        description: "Last update timestamp"
    }),
    __metadata("design:type", String)
], WalletResponseDto.prototype, "updatedAt", void 0);
class TransactionResponseDto {
    _id;
    walletId;
    userId;
    type;
    amount;
    status;
    description;
    reference;
    recipientWalletId;
    balanceBefore;
    balanceAfter;
    metadata;
    createdAt;
    updatedAt;
}
exports.TransactionResponseDto = TransactionResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "507f1f77bcf86cd799439017",
        description: "Transaction's unique identifier"
    }),
    __metadata("design:type", String)
], TransactionResponseDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "507f1f77bcf86cd799439016",
        description: "Wallet ID associated with this transaction"
    }),
    __metadata("design:type", String)
], TransactionResponseDto.prototype, "walletId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "507f1f77bcf86cd799439011",
        description: "User ID who initiated the transaction"
    }),
    __metadata("design:type", String)
], TransactionResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: transaction_type_enum_1.TransactionType.DEPOSIT,
        enum: transaction_type_enum_1.TransactionType,
        description: "Type of transaction"
    }),
    __metadata("design:type", String)
], TransactionResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1000.00,
        description: "Transaction amount"
    }),
    __metadata("design:type", Number)
], TransactionResponseDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: transaction_status_enum_1.TransactionStatus.COMPLETED,
        enum: transaction_status_enum_1.TransactionStatus,
        description: "Current transaction status"
    }),
    __metadata("design:type", String)
], TransactionResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Bank transfer deposit",
        description: "Transaction description",
        required: false
    }),
    __metadata("design:type", String)
], TransactionResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "REF123456789",
        description: "Transaction reference number",
        required: false
    }),
    __metadata("design:type", String)
], TransactionResponseDto.prototype, "reference", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "507f1f77bcf86cd799439018",
        description: "Recipient wallet ID (for transfers)",
        required: false
    }),
    __metadata("design:type", String)
], TransactionResponseDto.prototype, "recipientWalletId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 14750.50,
        description: "Wallet balance before transaction"
    }),
    __metadata("design:type", Number)
], TransactionResponseDto.prototype, "balanceBefore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 15750.50,
        description: "Wallet balance after transaction"
    }),
    __metadata("design:type", Number)
], TransactionResponseDto.prototype, "balanceAfter", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            "paymentMethod": "bank_transfer",
            "bankAccount": "****1234",
            "processingTime": "instant"
        },
        description: "Additional transaction metadata",
        required: false
    }),
    __metadata("design:type", Object)
], TransactionResponseDto.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "2024-01-20T14:30:00.000Z",
        description: "Transaction creation timestamp"
    }),
    __metadata("design:type", String)
], TransactionResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "2024-01-20T14:30:00.000Z",
        description: "Last update timestamp"
    }),
    __metadata("design:type", String)
], TransactionResponseDto.prototype, "updatedAt", void 0);
class TransactionListResponseDto {
    transactions;
    total;
    skip;
    limit;
    hasMore;
}
exports.TransactionListResponseDto = TransactionListResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [TransactionResponseDto],
        description: "Array of transactions"
    }),
    __metadata("design:type", Array)
], TransactionListResponseDto.prototype, "transactions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 25,
        description: "Total number of transactions"
    }),
    __metadata("design:type", Number)
], TransactionListResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 0,
        description: "Number of transactions skipped"
    }),
    __metadata("design:type", Number)
], TransactionListResponseDto.prototype, "skip", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 50,
        description: "Maximum number of transactions returned"
    }),
    __metadata("design:type", Number)
], TransactionListResponseDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: "Whether there are more transactions available"
    }),
    __metadata("design:type", Boolean)
], TransactionListResponseDto.prototype, "hasMore", void 0);
class WalletStatsResponseDto {
    walletId;
    currentBalance;
    totalDeposits;
    totalWithdrawals;
    totalInvestments;
    totalTransfers;
    totalTransactions;
    periodSummary;
}
exports.WalletStatsResponseDto = WalletStatsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "507f1f77bcf86cd799439016",
        description: "Wallet ID"
    }),
    __metadata("design:type", String)
], WalletStatsResponseDto.prototype, "walletId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 15750.50,
        description: "Current balance"
    }),
    __metadata("design:type", Number)
], WalletStatsResponseDto.prototype, "currentBalance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 25000.00,
        description: "Total amount deposited"
    }),
    __metadata("design:type", Number)
], WalletStatsResponseDto.prototype, "totalDeposits", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 9250.00,
        description: "Total amount withdrawn"
    }),
    __metadata("design:type", Number)
], WalletStatsResponseDto.prototype, "totalWithdrawals", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 12500.00,
        description: "Total amount invested"
    }),
    __metadata("design:type", Number)
], WalletStatsResponseDto.prototype, "totalInvestments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 2750.00,
        description: "Total amount transferred to others"
    }),
    __metadata("design:type", Number)
], WalletStatsResponseDto.prototype, "totalTransfers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 156,
        description: "Total number of transactions"
    }),
    __metadata("design:type", Number)
], WalletStatsResponseDto.prototype, "totalTransactions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            "thisMonth": 3250.00,
            "lastMonth": 2100.00,
            "thisYear": 25000.00
        },
        description: "Transaction summary by period"
    }),
    __metadata("design:type", Object)
], WalletStatsResponseDto.prototype, "periodSummary", void 0);
class TransferRecipientDto {
    userId;
    fullName;
    email;
    walletId;
}
exports.TransferRecipientDto = TransferRecipientDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "507f1f77bcf86cd799439012",
        description: "Recipient's user ID"
    }),
    __metadata("design:type", String)
], TransferRecipientDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Jane Smith",
        description: "Recipient's full name"
    }),
    __metadata("design:type", String)
], TransferRecipientDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "jane.smith@example.com",
        description: "Recipient's email address"
    }),
    __metadata("design:type", String)
], TransferRecipientDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "507f1f77bcf86cd799439019",
        description: "Recipient's wallet ID"
    }),
    __metadata("design:type", String)
], TransferRecipientDto.prototype, "walletId", void 0);
//# sourceMappingURL=wallet-response.dto.js.map