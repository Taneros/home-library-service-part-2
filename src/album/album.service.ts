import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from 'src/track/entities/track.entity';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const newAlbum = this.albumsRepository.create(createAlbumDto);
    return await this.albumsRepository.save(newAlbum);
  }

  async findAll(): Promise<Album[]> {
    return await this.albumsRepository.find();
  }

  async findOne(id: Album['id']): Promise<Album> {
    const album = await this.albumsRepository.findOne({ where: { id } });
    if (!album) throw new NotFoundException('Album not found');
    return album;
  }

  async update(
    id: Album['id'],
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    const album = await this.albumsRepository.findOne({ where: { id } });
    if (!album) throw new NotFoundException('Album not found');
    const updatedAlbum = { ...album, ...updateAlbumDto };
    return await this.albumsRepository.save(updatedAlbum);
  }

  async remove(id: string): Promise<void> {
    const album = await this.albumsRepository.findOne({
      where: { id },
      relations: ['tracks'],
    });
    if (!album) throw new NotFoundException('Album not found');

    for await (const track of album.tracks) {
      track.artistId = null;
      this.tracksRepository.save(track);
    }
    await this.albumsRepository.delete(id);
  }
}
