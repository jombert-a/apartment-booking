import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "../roles/entities/role.entity";
import { RolesModule } from "../roles/roles.module";
import { RolesService } from "../roles/roles.service";
import { User } from "../users/entities/user.entity";
import { UsersModule } from "../users/users.module";
import { UsersService } from "../users/users.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
	imports: [
		TypeOrmModule.forFeature([User, Role]),
		UsersModule,
		RolesModule,
		JwtModule.registerAsync({
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
				secret: config.get("JWT_SECRET"),
			}),
		}),
	],
	providers: [UsersService, RolesService, AuthService],
	controllers: [AuthController],
})
export class AuthModule {}
