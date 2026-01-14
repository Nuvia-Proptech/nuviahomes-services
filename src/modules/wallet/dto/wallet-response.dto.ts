import { ApiProperty } from "@nestjs/swagger"
import { TransactionType } from "@/common/enums/transaction-type.enum"
import { TransactionStatus } from "@/common/enums/transaction-status.enum"

export class WalletResponseDto {
  @ApiProperty({ 
    example: "507f1f77bcf86cd799439016",
    description: "Wallet's unique identifier"
  })
  _id: string

  @ApiProperty({ 
    example: "507f1f77bcf86cd799439011",
    description: "Owner's user ID"
  })
  userId: string

  @ApiProperty({ 
    example: 15750.50,
    description: "Current wallet balance"
  })
  balance: number

  @ApiProperty({ 
    example: "USD",
    description: "Wallet currency"
  })
  currency: string

  @ApiProperty({ 
    example: true,
    description: "Whether the wallet is active"
  })
  isActive: boolean

  @ApiProperty({ 
    example: "2024-01-15T10:30:00.000Z",
    description: "Wallet creation timestamp"
  })
  createdAt: string

  @ApiProperty({ 
    example: "2024-01-20T14:45:00.000Z",
    description: "Last update timestamp"
  })
  updatedAt: string
}

export class TransactionResponseDto {
  @ApiProperty({ 
    example: "507f1f77bcf86cd799439017",
    description: "Transaction's unique identifier"
  })
  _id: string

  @ApiProperty({ 
    example: "507f1f77bcf86cd799439016",
    description: "Wallet ID associated with this transaction"
  })
  walletId: string

  @ApiProperty({ 
    example: "507f1f77bcf86cd799439011",
    description: "User ID who initiated the transaction"
  })
  userId: string

  @ApiProperty({ 
    example: TransactionType.DEPOSIT,
    enum: TransactionType,
    description: "Type of transaction"
  })
  type: TransactionType

  @ApiProperty({ 
    example: 1000.00,
    description: "Transaction amount"
  })
  amount: number

  @ApiProperty({ 
    example: TransactionStatus.COMPLETED,
    enum: TransactionStatus,
    description: "Current transaction status"
  })
  status: TransactionStatus

  @ApiProperty({ 
    example: "Bank transfer deposit",
    description: "Transaction description",
    required: false
  })
  description?: string

  @ApiProperty({ 
    example: "REF123456789",
    description: "Transaction reference number",
    required: false
  })
  reference?: string

  @ApiProperty({ 
    example: "507f1f77bcf86cd799439018",
    description: "Recipient wallet ID (for transfers)",
    required: false
  })
  recipientWalletId?: string

  @ApiProperty({ 
    example: 14750.50,
    description: "Wallet balance before transaction"
  })
  balanceBefore: number

  @ApiProperty({ 
    example: 15750.50,
    description: "Wallet balance after transaction"
  })
  balanceAfter: number

  @ApiProperty({ 
    example: {
      "paymentMethod": "bank_transfer",
      "bankAccount": "****1234",
      "processingTime": "instant"
    },
    description: "Additional transaction metadata",
    required: false
  })
  metadata?: Record<string, any>

  @ApiProperty({ 
    example: "2024-01-20T14:30:00.000Z",
    description: "Transaction creation timestamp"
  })
  createdAt: string

  @ApiProperty({ 
    example: "2024-01-20T14:30:00.000Z",
    description: "Last update timestamp"
  })
  updatedAt: string
}

export class TransactionListResponseDto {
  @ApiProperty({ 
    type: [TransactionResponseDto],
    description: "Array of transactions"
  })
  transactions: TransactionResponseDto[]

  @ApiProperty({ 
    example: 25,
    description: "Total number of transactions"
  })
  total: number

  @ApiProperty({ 
    example: 0,
    description: "Number of transactions skipped"
  })
  skip: number

  @ApiProperty({ 
    example: 50,
    description: "Maximum number of transactions returned"
  })
  limit: number

  @ApiProperty({ 
    example: true,
    description: "Whether there are more transactions available"
  })
  hasMore: boolean
}

export class WalletStatsResponseDto {
  @ApiProperty({ 
    example: "507f1f77bcf86cd799439016",
    description: "Wallet ID"
  })
  walletId: string

  @ApiProperty({ 
    example: 15750.50,
    description: "Current balance"
  })
  currentBalance: number

  @ApiProperty({ 
    example: 25000.00,
    description: "Total amount deposited"
  })
  totalDeposits: number

  @ApiProperty({ 
    example: 9250.00,
    description: "Total amount withdrawn"
  })
  totalWithdrawals: number

  @ApiProperty({ 
    example: 12500.00,
    description: "Total amount invested"
  })
  totalInvestments: number

  @ApiProperty({ 
    example: 2750.00,
    description: "Total amount transferred to others"
  })
  totalTransfers: number

  @ApiProperty({ 
    example: 156,
    description: "Total number of transactions"
  })
  totalTransactions: number

  @ApiProperty({ 
    example: {
      "thisMonth": 3250.00,
      "lastMonth": 2100.00,
      "thisYear": 25000.00
    },
    description: "Transaction summary by period"
  })
  periodSummary: Record<string, number>
}

export class TransferRecipientDto {
  @ApiProperty({ 
    example: "507f1f77bcf86cd799439012",
    description: "Recipient's user ID"
  })
  userId: string

  @ApiProperty({ 
    example: "Jane Smith",
    description: "Recipient's full name"
  })
  fullName: string

  @ApiProperty({ 
    example: "jane.smith@example.com",
    description: "Recipient's email address"
  })
  email: string

  @ApiProperty({ 
    example: "507f1f77bcf86cd799439019",
    description: "Recipient's wallet ID"
  })
  walletId: string
}