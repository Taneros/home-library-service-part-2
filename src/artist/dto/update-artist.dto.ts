import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { CreateArtistDto } from './create-artist.dto';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}
