import { CommonEntity } from 'src/modules/app/entities/common.entity';
import { Role } from 'src/modules/roles/entities/role.entity';
import { Entity, Column, ManyToOne } from 'typeorm';

@Entity()
export class User extends CommonEntity {
    @Column('varchar', { length: 64 })
    fullName: string;
    
    @Column('varchar', { length: 64, unique: true })
    email: string;

    @Column('varchar', { length: 12, unique: true })
    phone: string;

    @ManyToOne(() => Role, (role) => role.id)
    role: Role;
}
