import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { DatabaseService } from 'src/database/database.service';
import { Track } from 'src/track/entities/track.entity';
import { Repository } from 'typeorm';
import { Fav } from './entities/fav.entity';

@Injectable()
export class FavsService {
  constructor(
    @InjectRepository(Fav)
    private favsRepository: Repository<Fav>,
  ) {}

  async createFavArtist(id: Artist['id']) {
    const newFavArtist = this.favsRepository.create({ artists: id });
    return await this.favsRepository.save(newFavArtist);
  }

  async createFavAlbum(id: Album['id']) {
    const newFavAlbum = this.favsRepository.create({ albums: id });
    return await this.favsRepository.save(newFavAlbum);
  }

  async createFavTrack(id: Track['id']) {
    const newFavAlbum = this.favsRepository.create({ tracks: id });
    return await this.favsRepository.save(newFavAlbum);
  }

  async findAll() {
    return this.favsRepository.find();
  }

  // removeArtist(id: string) {
  //   const artistById = this.db.findOneFavorite(id, 'artists');
  //   if (!artistById) throw new NotFoundException('Artist is not favorite');
  //   return this.db.deleteFavoriteArtist(id);
  // }

  // removeAlbum(id: string) {
  //   const albumById = this.db.findOneFavorite(id, 'albums');
  //   if (!albumById) throw new NotFoundException('Album is not favorite');
  //   return this.db.deleteFavoriteAlbum(id);
  // }
  // removeTrack(id: string) {
  //   const trackById = this.db.findOneFavorite(id, 'tracks');
  //   if (!trackById) throw new NotFoundException('Track is not favorite');
  //   return this.db.deleteFavoriteTrack(id);
  // }
}
