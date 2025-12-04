import { Controller, Get, Post, Body, Param, Query, UseGuards, Req } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from "@nestjs/swagger"
import { WalletService } from "./wallet.service"
import { CreateWalletDto } from "./dto/create-wallet.dto"
import { DepositDto } from "./dto/deposit.dto"
import { WithdrawDto } from "./dto/withdraw.dto"
import { TransferDto } from "./dto/transfer.dto"
import { JwtAuthGuard } from "@/modules/auth/guards/jwt-auth.guard"

@ApiTags("Wallet")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("wallet")
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  @ApiOperation({ summary: "Create a wallet for the authenticated user" })
  @ApiResponse({ status: 201, description: "Wallet created successfully" })
  @ApiResponse({ status: 409, description: "Wallet already exists" })
  async createWallet(@Req() req: any, @Body() createWalletDto: CreateWalletDto) {
    return this.walletService.createWallet(req.user.sub, createWalletDto)
  }

  @Get()
  @ApiOperation({ summary: "Get wallet details" })
  @ApiResponse({ status: 200, description: "Wallet details retrieved" })
  @ApiResponse({ status: 404, description: "Wallet not found" })
  async getWallet(@Req() req: any) {
    return this.walletService.getWallet(req.user.sub)
  }

  @Post("deposit")
  @ApiOperation({ summary: "Deposit funds into wallet" })
  @ApiResponse({ status: 200, description: "Deposit successful" })
  @ApiResponse({ status: 400, description: "Bad request" })
  async deposit(@Req() req: any, @Body() depositDto: DepositDto) {
    return this.walletService.deposit(req.user.sub, depositDto)
  }

  @Post("withdraw")
  @ApiOperation({ summary: "Withdraw funds from wallet" })
  @ApiResponse({ status: 200, description: "Withdrawal successful" })
  @ApiResponse({ status: 400, description: "Insufficient balance or wallet inactive" })
  async withdraw(@Req() req: any, @Body() withdrawDto: WithdrawDto) {
    return this.walletService.withdraw(req.user.sub, withdrawDto)
  }

  @Post("transfer")
  @ApiOperation({ summary: "Transfer funds to another user" })
  @ApiResponse({ status: 200, description: "Transfer successful" })
  @ApiResponse({ status: 400, description: "Insufficient balance or invalid recipient" })
  async transfer(@Req() req: any, @Body() transferDto: TransferDto) {
    return this.walletService.transfer(req.user.sub, transferDto)
  }

  @Get("transactions")
  @ApiOperation({ summary: "Get wallet transaction history" })
  @ApiQuery({ name: "limit", required: false, type: Number, example: 50 })
  @ApiQuery({ name: "skip", required: false, type: Number, example: 0 })
  @ApiResponse({ status: 200, description: "Transactions retrieved" })
  async getTransactions(
    @Req() req: any,
    @Query("limit") limit?: number,
    @Query("skip") skip?: number,
  ) {
    return this.walletService.getTransactions(req.user.sub, limit, skip)
  }

  @Get("transactions/:id")
  @ApiOperation({ summary: "Get transaction details by ID" })
  @ApiResponse({ status: 200, description: "Transaction details retrieved" })
  @ApiResponse({ status: 404, description: "Transaction not found" })
  async getTransactionById(@Req() req: any, @Param("id") id: string) {
    return this.walletService.getTransactionById(req.user.sub, id)
  }
}
