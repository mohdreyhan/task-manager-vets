import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserRole } from '@my-monorepo/data';
import { Organization } from '../organization/organization.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.User })
  role: UserRole;

  @ManyToOne(() => Organization, (org) => org.users)
  organization: Organization;

  @Column({ nullable: true })
  organizationId?: string;

  @Column('text', { array: true, default: [] })
  permissions: string[];
}
