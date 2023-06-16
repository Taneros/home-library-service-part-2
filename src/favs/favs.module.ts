import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { Fav } from './entities/fav.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from 'src/artist/entities/artist.entity';
import { Album } from 'src/album/entities/album.entity';
import { Track } from 'src/track/entities/track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fav, Artist, Album, Track])],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
