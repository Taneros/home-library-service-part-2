import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  // constructor(private db: DatabaseService) {}
  // create(createTrackDto: CreateTrackDto) {
  //   return this.db.createTrack(createTrackDto);
  // }
  // findAll() {
  //   return this.db.findAllTracks();
  // }
  // findOne(id: string) {
  //   const trackById = this.db.findOneTrack(id);
  //   if (trackById) return trackById;
  //   throw new NotFoundException('Track not found');
  // }
  // update(id: string, updateTrackDto: UpdateTrackDto) {
  //   const trackById = this.db.findOneTrack(id);
  //   if (!trackById) throw new NotFoundException('Track not found');
  //   const updatedTrack = this.db.updateTrack(id, updateTrackDto);
  //   return updatedTrack;
  // }
  // remove(id: string) {
  //   const deletedTrack = this.db.deleteTrack(id);
  //   if (!deletedTrack) {
  //     throw new NotFoundException('Track not found');
  //   } else {
  //     return deletedTrack;
  //   }
  // }
}
