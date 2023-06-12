import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from 'src/album/entities/album.entity';
import { DatabaseService } from 'src/database/database.service';
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
  ) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const newArtist = this.artistsRepository.create(createArtistDto);
    return this.artistsRepository.save(newArtist);
  }

  async findAll(): Promise<Artist[]> {
    return this.artistsRepository.find();
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
      relations: ['albums'],
    });
    if (!artist) throw new NotFoundException('Artist not found');

    console.log(`artist.service.ts - line: 52 ->> artist`, artist);

    for (const album of artist.albums) {
      album.artistId = null;
      await this.albumsRepository.save(album);
    }

    const resultDelete = await this.artistsRepository.delete(id);
    if (resultDelete.affected === 0)
      throw new NotFoundException('Artist not found');

    // await this.albumsRepository.update({ artistId: id }, { artistId: null });
  }
}
