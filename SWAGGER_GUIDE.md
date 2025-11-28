# Swagger API Documentation Guide

## Overview

This project uses Swagger/OpenAPI for comprehensive API documentation. All endpoints are documented with decorators that provide interactive documentation at `/api/docs`.

## 🚀 Quick Start

### Accessing Swagger Documentation

1. Start the application:
   ```bash
   npm run start:dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3001/api/docs
   ```

3. You'll see an interactive Swagger UI with:
   - All available endpoints organized by tags
   - Request/response schemas
   - Try-it-out functionality
   - Authentication support

## 🔐 Using Authentication in Swagger

1. Login via the `/api/auth/login` endpoint to get a JWT token
2. Click the "Authorize" button (🔓) at the top of the Swagger UI
3. Enter your token in the format: `Bearer <your_token>`
4. Click "Authorize" to save
5. All subsequent requests will include the authentication header

## 📋 API Endpoints Summary

### Health
- `GET /` - Health check endpoint

### Auth
- `POST /api/auth/login` - User login

### Users (Admin Only)
- `GET /api/users` - Get all users (with filters)
- `GET /api/users/:id` - Get user by ID
- `PATCH /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user (Super Admin)
- `POST /api/users/:id/approve` - Approve user (Super Admin)
- `POST /api/users/:id/reject` - Reject user (Super Admin)

### Agents
- `GET /api/agents` - Get all agents
- `GET /api/agents/:userId` - Get agent profile by user ID
- `GET /api/agents/profile/me` - Get current agent's profile (Auth required)
- `PATCH /api/agents/profile/me` - Update current agent's profile (Auth required)

### Properties
- `POST /api/properties` - Create property listing (Auth required)
- `GET /api/properties` - Get all properties with filters
- `GET /api/properties/featured` - Get featured properties
- `GET /api/properties/:id` - Get property by ID
- `PATCH /api/properties/:id` - Update property (Auth required)
- `DELETE /api/properties/:id` - Delete property (Auth required)
- `POST /api/properties/:id/approve` - Approve property (Admin)
- `POST /api/properties/:id/reject` - Reject property (Admin)
- `GET /api/properties/owner/:ownerId` - Get properties by owner
- `POST /api/properties/:propertyId/reviews` - Create review (Auth required)
- `GET /api/properties/:propertyId/reviews` - Get property reviews
- `GET /api/properties/:propertyId/reviews/rating` - Get average rating

### Appointments
- `POST /api/appointments` - Create appointment (Auth required)
- `GET /api/appointments/agent/upcoming` - Get upcoming appointments for agent (Auth required)
- `GET /api/appointments/agent` - Get all agent appointments (Auth required)
- `GET /api/appointments/user` - Get all user appointments (Auth required)
- `GET /api/appointments/:id` - Get appointment by ID (Auth required)
- `PATCH /api/appointments/:id/status` - Update appointment status (Auth required)
- `POST /api/appointments/:id/notes` - Add agent notes (Auth required)
- `POST /api/appointments/:id/cancel` - Cancel appointment (Auth required)

### Investments
- `POST /api/investments/projects` - Create investment project (Auth required)
- `GET /api/investments/projects` - Get all investment projects
- `GET /api/investments/projects/opportunities` - Get investment opportunities
- `GET /api/investments/projects/:id` - Get project by ID
- `GET /api/investments/projects/:id/stats` - Get project statistics
- `PATCH /api/investments/projects/:id` - Update project (Auth required)
- `POST /api/investments/projects/:id/activate` - Activate project (Auth required)
- `GET /api/investments/projects/:id/investors` - Get project investors
- `POST /api/investments` - Create investment (Auth required)
- `GET /api/investments/my-investments` - Get user's investments (Auth required)
- `GET /api/investments/:id` - Get investment by ID
- `POST /api/investments/:id/approve` - Approve investment (Admin)
- `POST /api/investments/:id/withdraw` - Withdraw investment (Auth required)

### Blog
- `POST /api/blog/posts` - Create blog post (Auth required)
- `GET /api/blog/posts` - Get all published posts (with pagination)
- `GET /api/blog/posts/search` - Search blog posts
- `GET /api/blog/posts/tag/:tag` - Get posts by tag
- `GET /api/blog/posts/slug/:slug` - Get post by slug
- `GET /api/blog/posts/:id` - Get post by ID
- `PATCH /api/blog/posts/:id` - Update post (Auth required)
- `POST /api/blog/posts/:id/publish` - Publish post (Auth required)
- `DELETE /api/blog/posts/:id` - Delete post (Auth required)
- `GET /api/blog/posts/:slug/related` - Get related posts
- `POST /api/blog/posts/:id/like` - Like post (Auth required)
- `POST /api/blog/posts/:postId/comments` - Create comment (Auth required)
- `GET /api/blog/posts/:postId/comments` - Get post comments
- `DELETE /api/blog/comments/:commentId` - Delete comment (Auth required)
- `POST /api/blog/comments/:commentId/like` - Like comment (Auth required)
- `GET /api/blog/authors/:authorId` - Get posts by author

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all submissions (Admin)
- `GET /api/contact/:id` - Get submission by ID (Admin)
- `PATCH /api/contact/:id/read` - Mark as read (Admin)
- `PATCH /api/contact/:id/respond` - Respond to submission (Admin)
- `DELETE /api/contact/:id` - Delete submission (Admin)

### File Upload
- `POST /api/upload/single` - Upload single file (Auth required)
- `POST /api/upload/multiple` - Upload multiple files (Auth required)
- `DELETE /api/upload/:filepath` - Delete file (Auth required)

## 🎨 Swagger Decorators Used

### Controller Level

- **@ApiTags('TagName')**: Groups endpoints under a specific tag in the documentation
- **@ApiBearerAuth()**: Indicates that the endpoint requires JWT authentication

### Endpoint Level

- **@ApiOperation({ summary: 'Description' })**: Provides a brief description of what the endpoint does
- **@ApiResponse({ status: 200, description: 'Success message' })**: Documents possible responses
- **@ApiParam({ name: 'id', description: 'Parameter description' })**: Documents URL parameters
- **@ApiQuery({ name: 'filter', required: false })**: Documents query parameters
- **@ApiBody({ type: DtoClass })**: Documents the request body structure
- **@ApiConsumes('multipart/form-data')**: Specifies content type for file uploads

### DTO Level

- **@ApiProperty()**: Documents a property in a DTO class
- **@ApiProperty({ required: false })**: Documents an optional property
- **@ApiProperty({ enum: EnumType })**: Documents an enum property
- **@ApiProperty({ example: 'value' })**: Provides an example value

## 📝 Example Endpoint Documentation

```typescript
@Post()
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiOperation({ summary: "Create a new property listing" })
@ApiResponse({ status: 201, description: "Property created successfully" })
@ApiResponse({ status: 403, description: "Forbidden - insufficient permissions" })
async create(@Body() createPropertyDto: CreatePropertyDto, @CurrentUser() user: any) {
  return this.propertiesService.create(createPropertyDto, user.id)
}
```

## ⚙️ Customization

The Swagger configuration is located in `src/main.ts`. You can customize:

- API title and description
- Version number
- Authentication schemes
- Tags and their descriptions
- UI theme and styling

## ✅ Best Practices

1. Always add `@ApiOperation()` to describe what an endpoint does
2. Document all possible response codes with `@ApiResponse()`
3. Use `@ApiParam()` for path parameters
4. Use `@ApiQuery()` for query parameters
5. Add examples to DTOs with `@ApiProperty({ example: 'value' })`
6. Group related endpoints with `@ApiTags()`
7. Mark protected endpoints with `@ApiBearerAuth()`

## 📚 Additional Resources

- [NestJS Swagger Documentation](https://docs.nestjs.com/openapi/introduction)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Swagger UI](https://swagger.io/tools/swagger-ui/)
