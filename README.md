# Nuvia Homes API

Real estate company services - A comprehensive NestJS API for real estate management.

## Features

- 🏠 Property Management (listings, reviews, approvals)
- 💰 Investment Projects & Portfolio Management
- 💳 Wallet & Transaction Management
- 📅 Appointment Scheduling
- 👥 User & Agent Management
- 📝 Blog & Content Management
- 📧 Contact Form Management
- 📁 File Upload & Storage
- 🔐 JWT Authentication & Authorization
- 📊 Role-based Access Control

## 📚 API Documentation

The API documentation is automatically generated using Swagger/OpenAPI and is available at:

### 🌐 Swagger UI URL
```
http://localhost:3001/api/docs
```

**Quick Start:**
1. Run `npm run start:dev`
2. Open `http://localhost:3001/api/docs` in your browser
3. Explore and test all API endpoints interactively

See [SWAGGER_QUICK_START.md](./SWAGGER_QUICK_START.md) for detailed instructions.

### Swagger Features

- **Interactive API Explorer**: Test all endpoints directly from the browser
- **Authentication**: Use the "Authorize" button to add your JWT token
- **Request/Response Examples**: See example payloads for all endpoints
- **Schema Definitions**: View all DTOs and data models
- **Organized by Tags**: Endpoints grouped by feature (Properties, Investments, etc.)

### Available API Tags

- **Health**: Health check endpoints
- **Auth**: Login, signup, and password reset
- **Users**: User management (Admin)
- **Agents**: Agent profiles
- **Properties**: Property listings and reviews
- **Appointments**: Scheduling and management
- **Investments**: Investment projects and tracking
- **Wallet**: Wallet management, deposits, withdrawals, transfers, and transactions
- **Blog**: Blog posts and comments
- **Contact**: Contact form submissions
- **File Upload**: File management

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Running the Application

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

### Access the API

- API Base URL: `http://localhost:3001/api/`
- Swagger Documentation: `http://localhost:3001/api/docs`

## Authentication

Most endpoints require JWT authentication. To authenticate:

1. Use the `/api/auth/login` endpoint to get a JWT token
2. Click the "Authorize" button in Swagger UI
3. Enter your token in the format: `Bearer <your_token>`
4. All subsequent requests will include the authentication header

## Project Structure

```
src/
├── common/           # Shared enums and utilities
├── modules/          # Feature modules
│   ├── agents/       # Agent management
│   ├── appointments/ # Appointment scheduling
│   ├── auth/         # Authentication & authorization
│   ├── blog/         # Blog posts & comments
│   ├── contact/      # Contact form
│   ├── file-upload/  # File management
│   ├── investments/  # Investment projects
│   ├── properties/   # Property listings
│   ├── users/        # User management
│   └── wallet/       # Wallet & transactions
├── app.module.ts     # Root module
└── main.ts           # Application entry point
```

## Technologies

- **Framework**: NestJS
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with Passport
- **Validation**: class-validator & class-transformer
- **Documentation**: Swagger/OpenAPI
- **File Upload**: Multer

## License

MIT
