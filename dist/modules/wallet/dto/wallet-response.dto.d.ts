import { TransactionType } from "@/common/enums/transaction-type.enum";
import { TransactionStatus } from "@/common/enums/transaction-status.enum";
export declare class WalletResponseDto {
    _id: string;
    userId: string;
    balance: number;
    currency: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
export declare class TransactionResponseDto {
    _id: string;
    walletId: string;
    userId: string;
    type: TransactionType;
    amount: number;
    status: TransactionStatus;
    description?: string;
    reference?: string;
    recipientWalletId?: string;
    balanceBefore: number;
    balanceAfter: number;
    metadata?: Record<string, any>;
    createdAt: string;
    updatedAt: string;
}
export declare class TransactionListResponseDto {
    transactions: TransactionResponseDto[];
    total: number;
    skip: number;
    limit: number;
    hasMore: boolean;
}
export declare class WalletStatsResponseDto {
    walletId: string;
    currentBalance: number;
    totalDeposits: number;
    totalWithdrawals: number;
    totalInvestments: number;
    totalTransfers: number;
    totalTransactions: number;
    periodSummary: Record<string, number>;
}
export declare class TransferRecipientDto {
    userId: string;
    fullName: string;
    email: string;
    walletId: string;
}
