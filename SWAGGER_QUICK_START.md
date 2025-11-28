# 🚀 Swagger Quick Start Guide

## Access Swagger UI

**URL:** `http://localhost:3001/api/docs`

## Steps to Use

1. **Start the server:**
   ```bash
   npm run start:dev
   ```

2. **Open Swagger UI:**
   - Navigate to: `http://localhost:3001/api/docs`

3. **Authenticate (for protected endpoints):**
   - Click the **"Authorize"** button (🔓) at the top right
   - Login first via `POST /api/auth/login` to get your JWT token
   - Enter: `Bearer YOUR_JWT_TOKEN`
   - Click **"Authorize"**

4. **Test Endpoints:**
   - Expand any endpoint
   - Click **"Try it out"**
   - Fill in parameters/body
   - Click **"Execute"**
   - View the response

## Quick Reference

| Feature | Endpoint Example | Auth Required |
|---------|-----------------|---------------|
| Health Check | `GET /` | ❌ |
| Login | `POST /api/auth/login` | ❌ |
| Get Properties | `GET /api/properties` | ❌ |
| Create Property | `POST /api/properties` | ✅ |
| Get Agents | `GET /api/agents` | ❌ |
| My Profile | `GET /api/agents/profile/me` | ✅ |
| Create Appointment | `POST /api/appointments` | ✅ |
| Submit Contact | `POST /api/contact` | ❌ |
| Upload File | `POST /api/upload/single` | ✅ |
| Get Blog Posts | `GET /api/blog/posts` | ❌ |
| Create Blog Post | `POST /api/blog/posts` | ✅ |
| Get Investments | `GET /api/investments/projects` | ❌ |
| Create Investment | `POST /api/investments` | ✅ |

## API Tags

- 🏥 **Health** - Health check
- 🔐 **Auth** - Authentication
- 👥 **Users** - User management (Admin)
- 🏢 **Agents** - Agent profiles
- 🏠 **Properties** - Property listings
- 📅 **Appointments** - Scheduling
- 💰 **Investments** - Investment projects
- 📝 **Blog** - Blog posts & comments
- 📧 **Contact** - Contact forms
- 📁 **File Upload** - File management

## Common Response Codes

- **200** - Success
- **201** - Created
- **400** - Bad Request
- **401** - Unauthorized (missing/invalid token)
- **403** - Forbidden (insufficient permissions)
- **404** - Not Found
- **500** - Internal Server Error

## Tips

- 💡 Use the **Schemas** section at the bottom to see all DTOs
- 💡 All endpoints show example request/response bodies
- 💡 Filter endpoints by tag using the dropdown
- 💡 Download the OpenAPI spec using the link at the top

---

For detailed documentation, see [SWAGGER_GUIDE.md](./SWAGGER_GUIDE.md)
