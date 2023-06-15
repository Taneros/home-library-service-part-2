import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  VersionColumn,
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
    console.log(
      `user.entity.ts - line: 45 ->> this.version `,
      this.createdAt === this.updatedAt,
    );
    if (this.createdAt === this.updatedAt)
      this.updatedAt = Math.floor(Date.now() / 1000 + 1);
    else this.updatedAt = Math.floor(Date.now() / 1000);
  }

  @BeforeInsert()
  public setCreatedAt() {
    this.createdAt = Math.floor(Date.now() / 1000);
  }
}
