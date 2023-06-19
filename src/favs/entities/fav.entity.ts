import { Exclude } from 'class-transformer';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Fav {
  constructor(partial: Partial<Fav>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @ManyToMany(() => Artist, { nullable: true })
  @JoinTable()
  artists: Artist[];

  @ManyToMany(() => Album, { nullable: true })
  @JoinTable()
  albums: Album[];

  @ManyToMany(() => Track, { nullable: true })
  @JoinTable()
  tracks: Track[];
}
