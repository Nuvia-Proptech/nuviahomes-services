"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../../app.module");
const user_role_enum_1 = require("../../common/enums/user-role.enum");
const bcrypt = __importStar(require("bcryptjs"));
const user_schema_1 = require("../../modules/users/schemas/user.schema");
const mongoose_1 = require("@nestjs/mongoose");
async function seedAdminUsers() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const userModel = app.get((0, mongoose_1.getModelToken)(user_schema_1.User.name));
    try {
        const existingSuperAdmin = await userModel.findOne({
            email: 'admin@nuviahomes.com'
        });
        if (!existingSuperAdmin) {
            const hashedPassword = await bcrypt.hash('Admin123!', 10);
            const superAdmin = new userModel({
                firstName: 'Super',
                lastName: 'Admin',
                email: 'admin@nuviahomes.com',
                password: hashedPassword,
                role: user_role_enum_1.UserRole.SUPER_ADMIN,
                phone: '+1234567890',
                isVerified: true,
                isActive: true,
                bio: 'System Super Administrator',
                company: 'Nuvia Homes',
            });
            await superAdmin.save();
            console.log('✅ Super Admin created successfully');
            console.log('📧 Email: admin@nuviahomes.com');
            console.log('🔑 Password: Admin123!');
        }
        else {
            console.log('ℹ️  Super Admin already exists');
        }
        const existingAdmin = await userModel.findOne({
            email: 'manager@nuviahomes.com'
        });
        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash('Manager123!', 10);
            const admin = new userModel({
                firstName: 'Property',
                lastName: 'Manager',
                email: 'manager@nuviahomes.com',
                password: hashedPassword,
                role: user_role_enum_1.UserRole.ADMIN,
                phone: '+1234567891',
                isVerified: true,
                isActive: true,
                bio: 'Property Manager',
                company: 'Nuvia Homes',
            });
            await admin.save();
            console.log('✅ Admin created successfully');
            console.log('📧 Email: manager@nuviahomes.com');
            console.log('🔑 Password: Manager123!');
        }
        else {
            console.log('ℹ️  Admin already exists');
        }
        const existingAgent = await userModel.findOne({
            email: 'agent@nuviahomes.com'
        });
        if (!existingAgent) {
            const hashedPassword = await bcrypt.hash('Agent123!', 10);
            const agent = new userModel({
                firstName: 'John',
                lastName: 'Agent',
                email: 'agent@nuviahomes.com',
                password: hashedPassword,
                role: user_role_enum_1.UserRole.AGENT,
                phone: '+1234567892',
                isVerified: true,
                isActive: true,
                bio: 'Experienced Real Estate Agent',
                company: 'Nuvia Homes',
            });
            await agent.save();
            console.log('✅ Agent created successfully');
            console.log('📧 Email: agent@nuviahomes.com');
            console.log('🔑 Password: Agent123!');
        }
        else {
            console.log('ℹ️  Agent already exists');
        }
        console.log('\n🎉 Database seeding completed!');
        console.log('\n📋 Login Credentials Summary:');
        console.log('┌─────────────────────────────────────────────────────────┐');
        console.log('│ SUPER ADMIN                                             │');
        console.log('│ Email: admin@nuviahomes.com                             │');
        console.log('│ Password: Admin123!                                     │');
        console.log('│ Role: super_admin                                       │');
        console.log('├─────────────────────────────────────────────────────────┤');
        console.log('│ ADMIN                                                   │');
        console.log('│ Email: manager@nuviahomes.com                           │');
        console.log('│ Password: Manager123!                                   │');
        console.log('│ Role: admin                                             │');
        console.log('├─────────────────────────────────────────────────────────┤');
        console.log('│ AGENT                                                   │');
        console.log('│ Email: agent@nuviahomes.com                             │');
        console.log('│ Password: Agent123!                                     │');
        console.log('│ Role: agent                                             │');
        console.log('└─────────────────────────────────────────────────────────┘');
    }
    catch (error) {
        console.error('❌ Error seeding admin users:', error);
    }
    finally {
        await app.close();
    }
}
seedAdminUsers();
//# sourceMappingURL=admin-seed.js.map