import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { CreateTrackDto } from './create-track.dto';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  artistId: string; // refers to Artist

  @IsString()
  @IsOptional()
  albumId: string; // refers to Album

  @IsNumber()
  @IsNotEmpty()
  duration: number; // integer number
}
