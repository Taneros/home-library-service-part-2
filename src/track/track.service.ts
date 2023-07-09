import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const newTrack = this.tracksRepository.create(createTrackDto);
    return await this.tracksRepository.save(newTrack);
  }

  async findAll(): Promise<Track[]> {
    return this.tracksRepository.find();
  }

  async findOne(id: Track['id']): Promise<Track> {
    const track = await this.tracksRepository.findOne({ where: { id } });
    if (!track) throw new NotFoundException('Track not found');
    return track;
  }

  async update(
    id: Track['id'],
    updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    const track = await this.tracksRepository.findOne({ where: { id } });
    if (!track) throw new NotFoundException('Track not found');
    const updatedTrack = { ...track, ...updateTrackDto };
    return await this.tracksRepository.save(updatedTrack);
  }

  async remove(id: Track['id']): Promise<void> {
    const resultDelete = await this.tracksRepository.delete(id);
    if (resultDelete.affected === 0)
      throw new NotFoundException('Track not found');
  }
}
