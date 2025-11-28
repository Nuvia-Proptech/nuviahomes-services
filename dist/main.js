"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: [
            'http://localhost:8080',
            'https://test.nuviaproptech.com',
        ],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    app.setGlobalPrefix('api/', { exclude: ['/'] });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle("Nuvia Homes Real Estate API")
        .setDescription("Comprehensive NestJS Real Estate Management API with support for properties, investments, appointments, blog, and user management")
        .setVersion("1.0.0")
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
    }, 'JWT-auth')
        .addTag('Health', 'Health check endpoints')
        .addTag('Auth', 'Authentication endpoints')
        .addTag('Users', 'User management endpoints')
        .addTag('Agents', 'Agent profile endpoints')
        .addTag('Properties', 'Property listing and management')
        .addTag('Appointments', 'Appointment scheduling and management')
        .addTag('Investments', 'Investment projects and management')
        .addTag('Blog', 'Blog posts and comments')
        .addTag('Contact', 'Contact form submissions')
        .addTag('File Upload', 'File upload and management')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("api/docs", app, document, {
        customSiteTitle: 'Nuvia Homes API Documentation',
        customfavIcon: 'https://nestjs.com/img/logo-small.svg',
        customCss: '.swagger-ui .topbar { display: none }',
    });
    const port = process.env.PORT || 3001;
    await app.listen(port);
    const appUrl = await app.getUrl();
    console.log(`\n╔═══════════════════════════════════════════════════════════════╗`);
    console.log(`║  🚀 Application is running on: ${appUrl.padEnd(26)} ║`);
    console.log(`║  📚 Swagger Documentation: ${appUrl}/api/docs`.padEnd(64) + '║');
    console.log(`╚═══════════════════════════════════════════════════════════════╝\n`);
}
bootstrap();
//# sourceMappingURL=main.js.map