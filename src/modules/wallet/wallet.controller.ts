import { Controller, Get, Post, Body, Param, Query, UseGuards, Req } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiParam, ApiBody } from "@nestjs/swagger"
import { WalletService } from "./wallet.service"
import { CreateWalletDto } from "./dto/create-wallet.dto"
import { DepositDto } from "./dto/deposit.dto"
import { WithdrawDto } from "./dto/withdraw.dto"
import { TransferDto } from "./dto/transfer.dto"
import { WalletResponseDto, TransactionResponseDto, TransactionListResponseDto, WalletStatsResponseDto } from "./dto/wallet-response.dto"
import { JwtAuthGuard } from "@/modules/auth/guards/jwt-auth.guard"
import { ErrorResponseDto, NotFoundResponseDto, UnauthorizedResponseDto } from "@/common/dto/error-response.dto"

@ApiTags("Wallet")
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller("wallet")
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  @ApiOperation({ 
    summary: "Create a wallet for the authenticated user",
    description: "Create a new wallet for the currently authenticated user. Each user can only have one wallet."
  })
  @ApiBody({ 
    type: CreateWalletDto,
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
  })
  @ApiResponse({ 
    status: 201, 
    description: "Wallet created successfully",
    type: WalletResponseDto
  })
  @ApiResponse({ 
    status: 401, 
    description: "Unauthorized - Invalid or missing JWT token",
    type: UnauthorizedResponseDto
  })
  @ApiResponse({ 
    status: 409, 
    description: "Wallet already exists for this user",
    type: ErrorResponseDto
  })
  async createWallet(@Req() req: any, @Body() createWalletDto: CreateWalletDto) {
    return this.walletService.createWallet(req.user.sub, createWalletDto)
  }

  @Get()
  @ApiOperation({ 
    summary: "Get wallet details",
    description: "Retrieve wallet information for the currently authenticated user including current balance and status."
  })
  @ApiResponse({ 
    status: 200, 
    description: "Wallet details retrieved successfully",
    type: WalletResponseDto
  })
  @ApiResponse({ 
    status: 401, 
    description: "Unauthorized - Invalid or missing JWT token",
    type: UnauthorizedResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: "Wallet not found - User has no wallet",
    type: NotFoundResponseDto
  })
  async getWallet(@Req() req: any) {
    return this.walletService.getWallet(req.user.sub)
  }

  @Get("stats")
  @ApiOperation({ 
    summary: "Get wallet statistics",
    description: "Retrieve comprehensive statistics about the user's wallet including transaction summaries and balances."
  })
  @ApiResponse({ 
    status: 200, 
    description: "Wallet statistics retrieved successfully",
    type: WalletStatsResponseDto
  })
  @ApiResponse({ 
    status: 401, 
    description: "Unauthorized - Invalid or missing JWT token",
    type: UnauthorizedResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: "Wallet not found",
    type: NotFoundResponseDto
  })
  async getWalletStats(@Req() req: any) {
    // This would need to be implemented in the service
    // return this.walletService.getWalletStats(req.user.sub)
    throw new Error("Method not implemented in service")
  }

  @Post("deposit")
  @ApiOperation({ 
    summary: "Deposit funds into wallet",
    description: "Add funds to the user's wallet. The deposit will be processed and the wallet balance will be updated."
  })
  @ApiBody({ 
    type: DepositDto,
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
  })
  @ApiResponse({ 
    status: 200, 
    description: "Deposit successful - Funds added to wallet",
    type: TransactionResponseDto
  })
  @ApiResponse({ 
    status: 401, 
    description: "Unauthorized - Invalid or missing JWT token",
    type: UnauthorizedResponseDto
  })
  @ApiResponse({ 
    status: 400, 
    description: "Bad request - Invalid deposit amount or wallet inactive",
    type: ErrorResponseDto
  })
  async deposit(@Req() req: any, @Body() depositDto: DepositDto) {
    return this.walletService.deposit(req.user.sub, depositDto)
  }

  @Post("withdraw")
  @ApiOperation({ 
    summary: "Withdraw funds from wallet",
    description: "Withdraw funds from the user's wallet to their bank account. Requires sufficient balance."
  })
  @ApiBody({ 
    type: WithdrawDto,
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
  })
  @ApiResponse({ 
    status: 200, 
    description: "Withdrawal successful - Funds deducted from wallet",
    type: TransactionResponseDto
  })
  @ApiResponse({ 
    status: 401, 
    description: "Unauthorized - Invalid or missing JWT token",
    type: UnauthorizedResponseDto
  })
  @ApiResponse({ 
    status: 400, 
    description: "Bad request - Insufficient balance or wallet inactive",
    type: ErrorResponseDto
  })
  async withdraw(@Req() req: any, @Body() withdrawDto: WithdrawDto) {
    return this.walletService.withdraw(req.user.sub, withdrawDto)
  }

  @Post("transfer")
  @ApiOperation({ 
    summary: "Transfer funds to another user",
    description: "Transfer funds from your wallet to another user's wallet. Both users must have active wallets."
  })
  @ApiBody({ 
    type: TransferDto,
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
  })
  @ApiResponse({ 
    status: 200, 
    description: "Transfer successful - Funds transferred to recipient",
    type: TransactionResponseDto
  })
  @ApiResponse({ 
    status: 401, 
    description: "Unauthorized - Invalid or missing JWT token",
    type: UnauthorizedResponseDto
  })
  @ApiResponse({ 
    status: 400, 
    description: "Bad request - Insufficient balance, invalid recipient, or wallet inactive",
    type: ErrorResponseDto
  })
  async transfer(@Req() req: any, @Body() transferDto: TransferDto) {
    return this.walletService.transfer(req.user.sub, transferDto)
  }

  @Get("transactions")
  @ApiOperation({ 
    summary: "Get wallet transaction history",
    description: "Retrieve paginated transaction history for the user's wallet with optional filtering."
  })
  @ApiQuery({ 
    name: "limit", 
    required: false, 
    type: Number, 
    example: 50,
    description: "Maximum number of transactions to return (default: 50)"
  })
  @ApiQuery({ 
    name: "skip", 
    required: false, 
    type: Number, 
    example: 0,
    description: "Number of transactions to skip for pagination (default: 0)"
  })
  @ApiQuery({ 
    name: "type", 
    required: false, 
    enum: ["deposit", "withdrawal", "investment", "refund", "commission", "transfer"],
    description: "Filter by transaction type"
  })
  @ApiQuery({ 
    name: "status", 
    required: false, 
    enum: ["pending", "completed", "failed", "cancelled"],
    description: "Filter by transaction status"
  })
  @ApiResponse({ 
    status: 200, 
    description: "Transaction history retrieved successfully",
    type: TransactionListResponseDto
  })
  @ApiResponse({ 
    status: 401, 
    description: "Unauthorized - Invalid or missing JWT token",
    type: UnauthorizedResponseDto
  })
  async getTransactions(
    @Req() req: any,
    @Query("limit") limit?: number,
    @Query("skip") skip?: number,
    @Query("type") type?: string,
    @Query("status") status?: string,
  ) {
    return this.walletService.getTransactions(req.user.sub, limit, skip)
  }

  @Get("transactions/:id")
  @ApiOperation({ 
    summary: "Get transaction details by ID",
    description: "Retrieve detailed information about a specific transaction by its ID."
  })
  @ApiParam({ 
    name: "id", 
    description: "Transaction unique identifier",
    example: "507f1f77bcf86cd799439017"
  })
  @ApiResponse({ 
    status: 200, 
    description: "Transaction details retrieved successfully",
    type: TransactionResponseDto
  })
  @ApiResponse({ 
    status: 401, 
    description: "Unauthorized - Invalid or missing JWT token",
    type: UnauthorizedResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: "Transaction not found or doesn't belong to user",
    type: NotFoundResponseDto
  })
  async getTransactionById(@Req() req: any, @Param("id") id: string) {
    return this.walletService.getTransactionById(req.user.sub, id)
  }
}
