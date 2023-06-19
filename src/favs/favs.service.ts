import {
  HttpStatus,
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
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
  ) {}

  private async _getFavs() {
    const allFavs = await this.favsRepository.find({
      relations: ['artists', 'albums', 'tracks'],
    });

    if (allFavs.length > 0) return allFavs[0];
    const newFavs = this.favsRepository.create({
      artists: [],
      albums: [],
      tracks: [],
    });
    await this.favsRepository.save(newFavs);
    return newFavs;
  }

  async createFavArtist(id: Artist['id']) {
    const allFavs = await this._getFavs();
    const artist = await this.artistsRepository.findOne({ where: { id } });
    if (!artist) throw new UnprocessableEntityException('Artist not found');

    allFavs.artists = [...allFavs.artists, artist];

    await this.favsRepository.save(allFavs);

    return allFavs.artists;
  }

  async createFavAlbum(id: Album['id']) {
    const allFavs = await this._getFavs();
    const album = await this.albumsRepository.findOne({ where: { id } });
    if (!album) throw new UnprocessableEntityException('Album not found');

    allFavs.albums = [...allFavs.albums, album];

    await this.favsRepository.save(allFavs);

    return allFavs.albums;
  }

  async createFavTrack(id: Track['id']) {
    const allFavs = await this._getFavs();
    const track = await this.tracksRepository.findOne({ where: { id } });
    if (!track) throw new UnprocessableEntityException('Track not found');

    allFavs.tracks = [...allFavs.tracks, track];

    await this.favsRepository.save(allFavs);

    return allFavs.tracks;
  }

  async findAll() {
    return await this._getFavs();
  }

  async removeArtist(id: string) {
    const allFavs = await this._getFavs();

    allFavs.artists = allFavs.artists.filter((artist) => artist.id !== id);

    return await this.favsRepository.save(allFavs);
  }

  async removeAlbum(id: string) {
    const allFavs = await this._getFavs();

    allFavs.albums = allFavs.albums.filter((album) => album.id !== id);

    return await this.favsRepository.save(allFavs);
  }

  async removeTrack(id: string) {
    const allFavs = await this._getFavs();

    allFavs.tracks = allFavs.tracks.filter((track) => track.id !== id);

    return await this.favsRepository.save(allFavs);
  }
}
