import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { Fav } from './entities/fav.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Fav])],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
