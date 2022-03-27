import { Module } from "@nestjs/common";
import { Role } from "./entities/role.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RolesService } from "./roles.service";

@Module({
	imports: [TypeOrmModule.forFeature([Role])],
	providers: [RolesService],
})
export class RolesModule {}
