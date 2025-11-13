import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { AgentsService } from "./agents.service"
import { AgentsController } from "./agents.controller"
import { AgentProfile, AgentProfileSchema } from "./schemas/agent-profile.schema"

@Module({
  imports: [MongooseModule.forFeature([{ name: AgentProfile.name, schema: AgentProfileSchema }])],
  controllers: [AgentsController],
  providers: [AgentsService],
  exports: [AgentsService],
})
export class AgentsModule {}
