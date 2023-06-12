import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from 'src/album/entities/album.entity';
import { Fav } from 'src/favs/entities/fav.entity';
import { Track } from 'src/track/entities/track.entity';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
    @InjectRepository(Fav)
    private favsRepository: Repository<Fav>,
  ) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const newArtist = this.artistsRepository.create(createArtistDto);
    return await this.artistsRepository.save(newArtist);
  }

  async findAll(): Promise<Artist[]> {
    return await this.artistsRepository.find();
  }

  async findOne(id: Artist['id']): Promise<Artist> {
    const artist = await this.artistsRepository.findOne({ where: { id } });
    if (!artist) throw new NotFoundException('Artist not found');
    return artist;
  }

  async update(
    id: Artist['id'],
    updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    const artist = await this.artistsRepository.findOne({ where: { id } });
    if (!artist) throw new NotFoundException('Artist not found');

    artist.grammy = updateArtistDto.grammy;
    artist.name = updateArtistDto.name;

    await this.artistsRepository.save(artist);
    return artist;
  }

  async remove(id: Artist['id']): Promise<void> {
    const artist = await this.artistsRepository.findOne({
      where: { id },
      relations: ['albums', 'tracks', 'favs'],
    });
    if (!artist) throw new NotFoundException('Artist not found');

    console.log(`artist.service.ts - line: 60 ->> artist`, artist);

    for await (const album of artist.albums) {
      album.artistId = null;
      this.albumsRepository.save(album);
    }

    for await (const track of artist.tracks) {
      track.artistId = null;
      this.tracksRepository.save(track);
    }

    // for await (const track of artist.tracks) {
    //   track.artistId = null;
    //   this.tracksRepository.save(track);
    // }

    await this.artistsRepository.delete(id);
  }
}
