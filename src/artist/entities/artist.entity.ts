import { Album } from 'src/album/entities/album.entity';
import { Fav } from 'src/favs/entities/fav.entity';
import { Track } from 'src/track/entities/track.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @OneToMany(() => Track, (track) => track.artist)
  tracks: Track[];

  @ManyToMany(() => Fav, (fav) => fav.favArtists)
  favs: Fav[];
}
