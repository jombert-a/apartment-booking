import { CommonEntity } from "src/modules/app/entities/common.entity";
import { Role } from "src/modules/roles/entities/role.entity";
import { Entity, Column, ManyToMany } from "typeorm";

@Entity()
export class Permission extends CommonEntity {
	@Column("varchar", { length: 64, unique: true })
	name: string;

	@ManyToMany(() => Role, (role) => role.permissions)
	roles: Role[];
}
