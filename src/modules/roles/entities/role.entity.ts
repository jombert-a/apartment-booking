import { CommonEntity } from 'src/modules/app/entities/common.entity';
import { Permission } from 'src/modules/persmissions/entities/permission.entity';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Role extends CommonEntity {
  @Column('varchar', { length: 64, unique: true })
  name: string;

  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable()
  permissions: Permission[];
}
