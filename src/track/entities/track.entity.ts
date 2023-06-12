import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  artistId: string | null; // refers to Artist

  @Column({ nullable: true })
  albumId: string | null; // refers to Album

  @Column()
  duration: number; // integer number

  @ManyToOne(
    () => Artist,
    (artist) => {
      artist.tracks;
    },
  )
  artist: Artist;

  @ManyToOne(() => Album, (album) => album.tracks)
  album: Album;
}
