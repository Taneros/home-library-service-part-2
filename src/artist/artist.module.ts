import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { Album } from 'src/album/entities/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Artist, Album])],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
