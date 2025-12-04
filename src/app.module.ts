import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { MongooseModule } from "@nestjs/mongoose"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { UsersModule } from "./modules/users/users.module"
import { AuthModule } from "./modules/auth/auth.module"
import { PropertiesModule } from "./modules/properties/properties.module"
import { InvestmentsModule } from "./modules/investments/investments.module"
import { AgentsModule } from "./modules/agents/agents.module"
import { BlogModule } from "./modules/blog/blog.module"
import { FileUploadModule } from "./modules/file-upload/file-upload.module"
import { AppointmentsModule } from "./modules/appointments/appointments.module"
import { ContactModule } from "./modules/contact/contact.module"
import { WalletModule } from "./modules/wallet/wallet.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("MONGO_URI") || "",
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    PropertiesModule,
    InvestmentsModule,
    AgentsModule,
    BlogModule,
    FileUploadModule,
    AppointmentsModule,
    ContactModule,
    WalletModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
