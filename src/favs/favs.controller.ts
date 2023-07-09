import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
@UseInterceptors(ClassSerializerInterceptor)
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Post('artist/:id')
  createArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.createFavArtist(id);
  }

  @Post('track/:id')
  createTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.createFavTrack(id);
  }

  @Post('album/:id')
  createAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.createFavAlbum(id);
  }

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.removeArtist(id);
  }
  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.removeAlbum(id);
  }
  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.removeTrack(id);
  }
}
