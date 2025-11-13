import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { InvestmentsService } from "./investments.service"
import { InvestmentsController } from "./investments.controller"
import { InvestmentProject, InvestmentProjectSchema } from "./schemas/investment-project.schema"
import { Investment, InvestmentSchema } from "./schemas/investment.schema"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: InvestmentProject.name, schema: InvestmentProjectSchema },
      { name: Investment.name, schema: InvestmentSchema },
    ]),
  ],
  controllers: [InvestmentsController],
  providers: [InvestmentsService],
  exports: [InvestmentsService],
})
export class InvestmentsModule {}
