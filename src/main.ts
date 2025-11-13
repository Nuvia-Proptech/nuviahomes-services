import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Enable CORS
  app.enableCors({
    origin: [
      'http://localhost:8080',
      'https://test.nuviaproptech.com',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  
  app.setGlobalPrefix('api/', { exclude: ['/'] });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  // Swagger API Documentation
  const config = new DocumentBuilder()
    .setTitle("Real Estate API")
    .setDescription("NestJS Real Estate Management API")
    .setVersion("1.0")
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api/docs", app, document)

  const port = process.env.PORT || 3001;
  await app.listen(port);



  // await app.listen(3000)
  console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
