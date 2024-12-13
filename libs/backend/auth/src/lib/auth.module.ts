import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth/auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { User, UserSchema, UserModule } from '@comp-gym/backend/user';
import { AuthService } from './auth/auth.service';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
		UserModule,
		JwtModule.register({
			secret: process.env['JWT_SECRET'],
			signOptions: { expiresIn: '12 days' },
		}),
	],
	controllers: [AuthController],
	providers: [AuthService],
	exports: [AuthService],
})
export class AuthModule {}
