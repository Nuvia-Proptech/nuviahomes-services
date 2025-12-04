import { WalletService } from "./wallet.service";
import { CreateWalletDto } from "./dto/create-wallet.dto";
import { DepositDto } from "./dto/deposit.dto";
import { WithdrawDto } from "./dto/withdraw.dto";
import { TransferDto } from "./dto/transfer.dto";
export declare class WalletController {
    private readonly walletService;
    constructor(walletService: WalletService);
    createWallet(req: any, createWalletDto: CreateWalletDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/wallet.schema").Wallet, {}, {}> & import("./schemas/wallet.schema").Wallet & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getWallet(req: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/wallet.schema").Wallet, {}, {}> & import("./schemas/wallet.schema").Wallet & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    deposit(req: any, depositDto: DepositDto): Promise<{
        wallet: import("mongoose").Document<unknown, {}, import("./schemas/wallet.schema").Wallet, {}, {}> & import("./schemas/wallet.schema").Wallet & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
        transaction: import("mongoose").Document<unknown, {}, import("./schemas/transaction.schema").Transaction, {}, {}> & import("./schemas/transaction.schema").Transaction & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    withdraw(req: any, withdrawDto: WithdrawDto): Promise<{
        wallet: import("mongoose").Document<unknown, {}, import("./schemas/wallet.schema").Wallet, {}, {}> & import("./schemas/wallet.schema").Wallet & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
        transaction: import("mongoose").Document<unknown, {}, import("./schemas/transaction.schema").Transaction, {}, {}> & import("./schemas/transaction.schema").Transaction & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    transfer(req: any, transferDto: TransferDto): Promise<{
        senderWallet: import("mongoose").Document<unknown, {}, import("./schemas/wallet.schema").Wallet, {}, {}> & import("./schemas/wallet.schema").Wallet & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
        recipientWallet: import("mongoose").Document<unknown, {}, import("./schemas/wallet.schema").Wallet, {}, {}> & import("./schemas/wallet.schema").Wallet & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
        transaction: import("mongoose").Document<unknown, {}, import("./schemas/transaction.schema").Transaction, {}, {}> & import("./schemas/transaction.schema").Transaction & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    getTransactions(req: any, limit?: number, skip?: number): Promise<{
        transactions: (import("mongoose").Document<unknown, {}, import("./schemas/transaction.schema").Transaction, {}, {}> & import("./schemas/transaction.schema").Transaction & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        total: number;
        limit: number;
        skip: number;
    }>;
    getTransactionById(req: any, id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/transaction.schema").Transaction, {}, {}> & import("./schemas/transaction.schema").Transaction & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
