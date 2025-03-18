import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { Movie } from './entities/movie.entity';
import { SyncMoviesTask } from './tasks/sync-movies.task';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), HttpModule],
  controllers: [MoviesController],
  providers: [MoviesService, SyncMoviesTask],
})
export class MoviesModule {}
