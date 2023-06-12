import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Album, Artist, Track])],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
