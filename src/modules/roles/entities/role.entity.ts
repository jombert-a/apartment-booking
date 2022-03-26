import { CommonEntity } from "src/modules/app/entities/common.entity";
import { Permission } from "src/modules/persmissions/entities/permission.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Entity, Column, ManyToMany, JoinTable, OneToMany } from "typeorm";

@Entity()
export class Role extends CommonEntity {
	@Column("varchar", { length: 64, unique: true })
	name: string;

	@OneToMany(() => User, (user) => user.role)
	users: User[];

	@ManyToMany(() => Permission, (permission) => permission.roles)
	@JoinTable()
	permissions: Permission[];
}
