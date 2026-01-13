import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { UsersService } from '../../modules/users/users.service';
import { UserRole } from '../../common/enums/user-role.enum';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { User } from '../../modules/users/schemas/user.schema';
import { getModelToken } from '@nestjs/mongoose';

async function seedAdminUsers() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userModel = app.get<Model<User>>(getModelToken(User.name));

  try {
    // Check if super admin already exists
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
        role: UserRole.SUPER_ADMIN,
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
    } else {
      console.log('ℹ️  Super Admin already exists');
    }

    // Check if regular admin already exists
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
        role: UserRole.ADMIN,
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
    } else {
      console.log('ℹ️  Admin already exists');
    }

    // Create a sample agent
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
        role: UserRole.AGENT,
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
    } else {
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

  } catch (error) {
    console.error('❌ Error seeding admin users:', error);
  } finally {
    await app.close();
  }
}

// Run the seeding function
seedAdminUsers();