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
exports.WalletService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const wallet_schema_1 = require("./schemas/wallet.schema");
const transaction_schema_1 = require("./schemas/transaction.schema");
const transaction_type_enum_1 = require("../../common/enums/transaction-type.enum");
const transaction_status_enum_1 = require("../../common/enums/transaction-status.enum");
let WalletService = class WalletService {
    walletModel;
    transactionModel;
    constructor(walletModel, transactionModel) {
        this.walletModel = walletModel;
        this.transactionModel = transactionModel;
    }
    async createWallet(userId, createWalletDto) {
        const existingWallet = await this.walletModel.findOne({ userId });
        if (existingWallet) {
            throw new common_1.ConflictException("Wallet already exists for this user");
        }
        const wallet = new this.walletModel({
            userId,
            balance: 0,
            currency: createWalletDto?.currency || "USD",
            isActive: true,
        });
        return wallet.save();
    }
    async getWallet(userId) {
        const wallet = await this.walletModel.findOne({ userId });
        if (!wallet) {
            throw new common_1.NotFoundException("Wallet not found");
        }
        return wallet;
    }
    async deposit(userId, depositDto) {
        const wallet = await this.getWallet(userId);
        if (!wallet.isActive) {
            throw new common_1.BadRequestException("Wallet is not active");
        }
        const balanceBefore = wallet.balance;
        wallet.balance += depositDto.amount;
        await wallet.save();
        const transaction = new this.transactionModel({
            walletId: wallet._id,
            userId,
            type: transaction_type_enum_1.TransactionType.DEPOSIT,
            amount: depositDto.amount,
            status: transaction_status_enum_1.TransactionStatus.COMPLETED,
            description: depositDto.description,
            reference: depositDto.reference,
            balanceBefore,
            balanceAfter: wallet.balance,
        });
        await transaction.save();
        return {
            wallet,
            transaction,
        };
    }
    async withdraw(userId, withdrawDto) {
        const wallet = await this.getWallet(userId);
        if (!wallet.isActive) {
            throw new common_1.BadRequestException("Wallet is not active");
        }
        if (wallet.balance < withdrawDto.amount) {
            throw new common_1.BadRequestException("Insufficient balance");
        }
        const balanceBefore = wallet.balance;
        wallet.balance -= withdrawDto.amount;
        await wallet.save();
        const transaction = new this.transactionModel({
            walletId: wallet._id,
            userId,
            type: transaction_type_enum_1.TransactionType.WITHDRAWAL,
            amount: withdrawDto.amount,
            status: transaction_status_enum_1.TransactionStatus.COMPLETED,
            description: withdrawDto.description,
            balanceBefore,
            balanceAfter: wallet.balance,
        });
        await transaction.save();
        return {
            wallet,
            transaction,
        };
    }
    async transfer(userId, transferDto) {
        const senderWallet = await this.getWallet(userId);
        const recipientWallet = await this.getWallet(transferDto.recipientUserId);
        if (!senderWallet.isActive) {
            throw new common_1.BadRequestException("Sender wallet is not active");
        }
        if (!recipientWallet.isActive) {
            throw new common_1.BadRequestException("Recipient wallet is not active");
        }
        if (senderWallet.balance < transferDto.amount) {
            throw new common_1.BadRequestException("Insufficient balance");
        }
        if (userId === transferDto.recipientUserId) {
            throw new common_1.BadRequestException("Cannot transfer to yourself");
        }
        const senderBalanceBefore = senderWallet.balance;
        senderWallet.balance -= transferDto.amount;
        await senderWallet.save();
        const recipientBalanceBefore = recipientWallet.balance;
        recipientWallet.balance += transferDto.amount;
        await recipientWallet.save();
        const senderTransaction = new this.transactionModel({
            walletId: senderWallet._id,
            userId,
            type: transaction_type_enum_1.TransactionType.TRANSFER,
            amount: -transferDto.amount,
            status: transaction_status_enum_1.TransactionStatus.COMPLETED,
            description: transferDto.description || `Transfer to user ${transferDto.recipientUserId}`,
            recipientWalletId: recipientWallet._id,
            balanceBefore: senderBalanceBefore,
            balanceAfter: senderWallet.balance,
        });
        await senderTransaction.save();
        const recipientTransaction = new this.transactionModel({
            walletId: recipientWallet._id,
            userId: transferDto.recipientUserId,
            type: transaction_type_enum_1.TransactionType.TRANSFER,
            amount: transferDto.amount,
            status: transaction_status_enum_1.TransactionStatus.COMPLETED,
            description: transferDto.description || `Transfer from user ${userId}`,
            balanceBefore: recipientBalanceBefore,
            balanceAfter: recipientWallet.balance,
        });
        await recipientTransaction.save();
        return {
            senderWallet,
            recipientWallet,
            transaction: senderTransaction,
        };
    }
    async getTransactions(userId, limit = 50, skip = 0) {
        const wallet = await this.getWallet(userId);
        const transactions = await this.transactionModel
            .find({ walletId: wallet._id })
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip);
        const total = await this.transactionModel.countDocuments({ walletId: wallet._id });
        return {
            transactions,
            total,
            limit,
            skip,
        };
    }
    async getTransactionById(userId, transactionId) {
        const wallet = await this.getWallet(userId);
        const transaction = await this.transactionModel.findOne({
            _id: transactionId,
            walletId: wallet._id,
        });
        if (!transaction) {
            throw new common_1.NotFoundException("Transaction not found");
        }
        return transaction;
    }
};
exports.WalletService = WalletService;
exports.WalletService = WalletService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(wallet_schema_1.Wallet.name)),
    __param(1, (0, mongoose_1.InjectModel)(transaction_schema_1.Transaction.name)),
    __metadata("design:paramtypes", [Function, Function])
], WalletService);
//# sourceMappingURL=wallet.service.js.map