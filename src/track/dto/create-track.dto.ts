import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsUUID,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  @IsOptional()
  artistId: string; // refers to Artist

  @IsUUID()
  @IsOptional()
  albumId: string; // refers to Album

  @IsNumber()
  @IsNotEmpty()
  duration: number; // integer number
}
