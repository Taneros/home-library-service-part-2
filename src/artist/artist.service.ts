import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private db: DatabaseService) {}

  create(createArtistDto: CreateArtistDto) {
    return this.db.createArtist(createArtistDto);
  }

  findAll() {
    return this.db.findAllArtists();
  }

  findOne(id: string) {
    const artistById = this.db.findOneArtist(id);
    if (artistById) return artistById;
    throw new NotFoundException('Artist not found');
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artistById = this.db.findOneArtist(id);
    if (!artistById) throw new NotFoundException('Artist not found');

    const updatedArtist = this.db.updateArtist(id, updateArtistDto);

    return updatedArtist;
  }

  remove(id: string) {
    const deletedArtist = this.db.deleteArtist(id);
    if (!deletedArtist) {
      throw new NotFoundException('Artist not found');
    } else {
      return deletedArtist;
    }
  }
}
