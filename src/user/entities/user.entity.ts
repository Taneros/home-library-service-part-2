import { classToPlain, Exclude, instanceToPlain } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
  BeforeUpdate,
  BeforeInsert,
  BeforeRemove,
} from 'typeorm';

@Entity()
export class User {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Exclude({ toPlainOnly: true })
  @Column({ select: false })
  password: string;

  @VersionColumn()
  version: number;

  @Column({
    type: 'int',
    readonly: true,
    default: () => 'extract(epoch from now())',
  })
  createdAt: number;

  @Column({
    type: 'int',
    readonly: true,
    default: () => 'extract(epoch from now())',
  })
  updatedAt: number;

  @BeforeUpdate()
  public setUpdatedAt() {
    this.updatedAt = Math.floor(Date.now() / 1000 + 1);
  }

  @BeforeInsert()
  public setCreatedAt() {
    this.createdAt = Math.floor(Date.now() / 1000);
  }
}
