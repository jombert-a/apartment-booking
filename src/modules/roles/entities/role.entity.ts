import { CommonEntity } from 'src/modules/app/entities/common.entity';
import { Entity, Column, PrimaryGeneratedColumn, Admin } from 'typeorm';

@Entity()
export class Role extends CommonEntity {
  @Column('varchar', { length: 64, unique: true })
  name: string;
}