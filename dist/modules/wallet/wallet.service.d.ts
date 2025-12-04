import type { Model } from "mongoose";
import { Wallet } from "./schemas/wallet.schema";
import { Transaction } from "./schemas/transaction.schema";
import type { CreateWalletDto } from "./dto/create-wallet.dto";
import type { DepositDto } from "./dto/deposit.dto";
import type { WithdrawDto } from "./dto/withdraw.dto";
import type { TransferDto } from "./dto/transfer.dto";
export declare class WalletService {
    private readonly walletModel;
    private readonly transactionModel;
    constructor(walletModel: Model<Wallet>, transactionModel: Model<Transaction>);
    createWallet(userId: string, createWalletDto?: CreateWalletDto): Promise<import("mongoose").Document<unknown, {}, Wallet, {}, {}> & Wallet & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getWallet(userId: string): Promise<import("mongoose").Document<unknown, {}, Wallet, {}, {}> & Wallet & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    deposit(userId: string, depositDto: DepositDto): Promise<{
        wallet: import("mongoose").Document<unknown, {}, Wallet, {}, {}> & Wallet & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
        transaction: import("mongoose").Document<unknown, {}, Transaction, {}, {}> & Transaction & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    withdraw(userId: string, withdrawDto: WithdrawDto): Promise<{
        wallet: import("mongoose").Document<unknown, {}, Wallet, {}, {}> & Wallet & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
        transaction: import("mongoose").Document<unknown, {}, Transaction, {}, {}> & Transaction & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    transfer(userId: string, transferDto: TransferDto): Promise<{
        senderWallet: import("mongoose").Document<unknown, {}, Wallet, {}, {}> & Wallet & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
        recipientWallet: import("mongoose").Document<unknown, {}, Wallet, {}, {}> & Wallet & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
        transaction: import("mongoose").Document<unknown, {}, Transaction, {}, {}> & Transaction & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    getTransactions(userId: string, limit?: number, skip?: number): Promise<{
        transactions: (import("mongoose").Document<unknown, {}, Transaction, {}, {}> & Transaction & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        total: number;
        limit: number;
        skip: number;
    }>;
    getTransactionById(userId: string, transactionId: string): Promise<import("mongoose").Document<unknown, {}, Transaction, {}, {}> & Transaction & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
