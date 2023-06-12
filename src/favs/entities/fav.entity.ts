import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Fav {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  artists: string;

  @Column({ nullable: true })
  albums: string;

  @Column({ nullable: true })
  tracks: string;

  // @Column()
  // @ManyToOne(() => Artist, (artist) => artist.favs)
  // @JoinTable()
  // favArtists: string;

  // @Column()
  // @ManyToOne(() => Album, (album) => album.favs)
  // @JoinTable()
  // albums: string;

  // @Column()
  // @ManyToOne(() => Track, (track) => track.favs)
  // @JoinTable()
  // tracks: string;

  @ManyToMany(() => Artist, (artist) => artist.favs)
  @JoinTable()
  favArtists: Artist[];

  // @ManyToMany(() => Album, (album) => album.favs)
  // @JoinTable()
  // favAlbums: Album[];

  // @ManyToMany(() => Track, (track) => track.favs)
  // @JoinTable()
  // favTracks: Track[];
}
