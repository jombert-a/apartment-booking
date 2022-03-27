import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { User } from "./entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RolesService } from "../roles/roles.service";
import { RolesModule } from "../roles/roles.module";
import { Role } from "../roles/entities/role.entity";

@Module({
	imports: [TypeOrmModule.forFeature([User, Role]), RolesModule],
	controllers: [UsersController],
	providers: [UsersService, RolesService],
})
export class UsersModule {}
