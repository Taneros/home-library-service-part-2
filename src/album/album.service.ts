import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const newAlbum = this.albumsRepository.create(createAlbumDto);
    return this.albumsRepository.save(newAlbum);
  }

  async findAll(): Promise<Album[]> {
    return this.albumsRepository.find();
  }

  async findOne(id: Album['id']): Promise<Album> {
    return this.albumsRepository.findOne({ where: { id } });
  }

  async update(
    id: Album['id'],
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    const album = await this.albumsRepository.findOne({ where: { id } });
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    const updatedAlbum = { ...album, ...updateAlbumDto };
    return this.albumsRepository.save(updatedAlbum);
  }

  async remove(id: string): Promise<void> {
    const resultDelete = await this.albumsRepository.delete(id);
    if (resultDelete.affected === 0) {
      throw new NotFoundException('Album not found');
    }
  }
}
