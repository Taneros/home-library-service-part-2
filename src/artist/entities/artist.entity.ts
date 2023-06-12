import { Album } from 'src/album/entities/album.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[];
}
