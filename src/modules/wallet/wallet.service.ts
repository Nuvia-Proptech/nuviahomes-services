import { Injectable, NotFoundException, BadRequestException, ConflictException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import type { Model } from "mongoose"
import { Wallet } from "./schemas/wallet.schema"
import { Transaction } from "./schemas/transaction.schema"
import { TransactionType } from "@/common/enums/transaction-type.enum"
import { TransactionStatus } from "@/common/enums/transaction-status.enum"
import type { CreateWalletDto } from "./dto/create-wallet.dto"
import type { DepositDto } from "./dto/deposit.dto"
import type { WithdrawDto } from "./dto/withdraw.dto"
import type { TransferDto } from "./dto/transfer.dto"

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name) private readonly walletModel: Model<Wallet>,
    @InjectModel(Transaction.name) private readonly transactionModel: Model<Transaction>,
  ) {}

  async createWallet(userId: string, createWalletDto?: CreateWalletDto) {
    const existingWallet = await this.walletModel.findOne({ userId })
    
    if (existingWallet) {
      throw new ConflictException("Wallet already exists for this user")
    }

    const wallet = new this.walletModel({
      userId,
      balance: 0,
      currency: createWalletDto?.currency || "USD",
      isActive: true,
    })

    return wallet.save()
  }

  async getWallet(userId: string) {
    const wallet = await this.walletModel.findOne({ userId })
    
    if (!wallet) {
      throw new NotFoundException("Wallet not found")
    }

    return wallet
  }

  async deposit(userId: string, depositDto: DepositDto) {
    const wallet = await this.getWallet(userId)

    if (!wallet.isActive) {
      throw new BadRequestException("Wallet is not active")
    }

    const balanceBefore = wallet.balance
    wallet.balance += depositDto.amount
    await wallet.save()

    const transaction = new this.transactionModel({
      walletId: wallet._id,
      userId,
      type: TransactionType.DEPOSIT,
      amount: depositDto.amount,
      status: TransactionStatus.COMPLETED,
      description: depositDto.description,
      reference: depositDto.reference,
      balanceBefore,
      balanceAfter: wallet.balance,
    })

    await transaction.save()

    return {
      wallet,
      transaction,
    }
  }

  async withdraw(userId: string, withdrawDto: WithdrawDto) {
    const wallet = await this.getWallet(userId)

    if (!wallet.isActive) {
      throw new BadRequestException("Wallet is not active")
    }

    if (wallet.balance < withdrawDto.amount) {
      throw new BadRequestException("Insufficient balance")
    }

    const balanceBefore = wallet.balance
    wallet.balance -= withdrawDto.amount
    await wallet.save()

    const transaction = new this.transactionModel({
      walletId: wallet._id,
      userId,
      type: TransactionType.WITHDRAWAL,
      amount: withdrawDto.amount,
      status: TransactionStatus.COMPLETED,
      description: withdrawDto.description,
      balanceBefore,
      balanceAfter: wallet.balance,
    })

    await transaction.save()

    return {
      wallet,
      transaction,
    }
  }

  async transfer(userId: string, transferDto: TransferDto) {
    const senderWallet = await this.getWallet(userId)
    const recipientWallet = await this.getWallet(transferDto.recipientUserId)

    if (!senderWallet.isActive) {
      throw new BadRequestException("Sender wallet is not active")
    }

    if (!recipientWallet.isActive) {
      throw new BadRequestException("Recipient wallet is not active")
    }

    if (senderWallet.balance < transferDto.amount) {
      throw new BadRequestException("Insufficient balance")
    }

    if (userId === transferDto.recipientUserId) {
      throw new BadRequestException("Cannot transfer to yourself")
    }

    // Deduct from sender
    const senderBalanceBefore = senderWallet.balance
    senderWallet.balance -= transferDto.amount
    await senderWallet.save()

    // Add to recipient
    const recipientBalanceBefore = recipientWallet.balance
    recipientWallet.balance += transferDto.amount
    await recipientWallet.save()

    // Create sender transaction
    const senderTransaction = new this.transactionModel({
      walletId: senderWallet._id,
      userId,
      type: TransactionType.TRANSFER,
      amount: -transferDto.amount,
      status: TransactionStatus.COMPLETED,
      description: transferDto.description || `Transfer to user ${transferDto.recipientUserId}`,
      recipientWalletId: recipientWallet._id,
      balanceBefore: senderBalanceBefore,
      balanceAfter: senderWallet.balance,
    })

    await senderTransaction.save()

    // Create recipient transaction
    const recipientTransaction = new this.transactionModel({
      walletId: recipientWallet._id,
      userId: transferDto.recipientUserId,
      type: TransactionType.TRANSFER,
      amount: transferDto.amount,
      status: TransactionStatus.COMPLETED,
      description: transferDto.description || `Transfer from user ${userId}`,
      balanceBefore: recipientBalanceBefore,
      balanceAfter: recipientWallet.balance,
    })

    await recipientTransaction.save()

    return {
      senderWallet,
      recipientWallet,
      transaction: senderTransaction,
    }
  }

  async getTransactions(userId: string, limit = 50, skip = 0) {
    const wallet = await this.getWallet(userId)

    const transactions = await this.transactionModel
      .find({ walletId: wallet._id })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)

    const total = await this.transactionModel.countDocuments({ walletId: wallet._id })

    return {
      transactions,
      total,
      limit,
      skip,
    }
  }

  async getTransactionById(userId: string, transactionId: string) {
    const wallet = await this.getWallet(userId)

    const transaction = await this.transactionModel.findOne({
      _id: transactionId,
      walletId: wallet._id,
    })

    if (!transaction) {
      throw new NotFoundException("Transaction not found")
    }

    return transaction
  }
}
