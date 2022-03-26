import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PermissionsModule } from "../persmissions/permissions.module";
import { RolesModule } from "../roles/roles.module";
import { UsersModule } from "../users/users.module";

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
				type: "postgres",
				host: config.get("DB_HOST"),
				port: +config.get("DB_PORT"),
				username: config.get("DB_USERNAME"),
				password: config.get("DB_PASSWORD"),
				database: config.get("DB_NAME"),
				entities: [__dirname + "/../**/*.entity{.ts,.js}"],
				synchronize: true,
			}),
		}),
		RolesModule,
		PermissionsModule,
		UsersModule,
	],
})
export class AppModule {}
