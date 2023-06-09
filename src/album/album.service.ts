import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  // constructor(private db: DatabaseService) {}
  // create(createAlbumDto: CreateAlbumDto) {
  //   return this.db.createAlbum(createAlbumDto);
  // }
  // findAll() {
  //   return this.db.findAllAlbums();
  // }
  // findOne(id: string) {
  //   const albumById = this.db.findOneAlbum(id);
  //   if (albumById) return albumById;
  //   throw new NotFoundException('Album not found');
  // }
  // update(id: string, updateAlbumDto: UpdateAlbumDto) {
  //   const albumById = this.db.findOneAlbum(id);
  //   if (!albumById) throw new NotFoundException('Album not found');
  //   const updatedAlbum = this.db.updateAlbum(id, updateAlbumDto);
  //   console.log(`album.service.ts - line: 28 ->> updatedAlbum`, updatedAlbum);
  //   return updatedAlbum;
  // }
  // remove(id: string) {
  //   const deletedAlbum = this.db.deleteAlbum(id);
  //   if (!deletedAlbum) {
  //     throw new NotFoundException('Album not found');
  //   } else {
  //     return deletedAlbum;
  //   }
  // }
}
