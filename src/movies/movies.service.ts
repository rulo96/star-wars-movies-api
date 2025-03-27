import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { SwapiResponse, SwapiFilm } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = this.moviesRepository.create(createMovieDto);
    return this.moviesRepository.save(movie);
  }

  async findAll(): Promise<Movie[]> {
    return this.moviesRepository.find();
  }

  async findOne(id: string): Promise<Movie> {
    const movie = await this.moviesRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException(`Película con ID ${id} no encontrada`);
    }
    return movie;
  }

  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.findOne(id);
    this.moviesRepository.merge(movie, updateMovieDto);
    return this.moviesRepository.save(movie);
  }

  async remove(id: string): Promise<void> {
    const movie = await this.findOne(id);
    await this.moviesRepository.remove(movie);
  }

  async syncWithSwapi(): Promise<Movie[]> {
    const baseUrl = this.configService.get<string>('swapi.baseUrl');
    const response = await firstValueFrom(
      this.httpService.get<SwapiResponse<SwapiFilm>>(`${baseUrl}/films/`),
    );

    const films = response.data.results;

    return Promise.all(
      films.map(async (film) => {
        const existingMovie = await this.moviesRepository.findOne({
          where: { url: film.url },
        });

        const movieData = {
          title: film.title,
          episode_id: film.episode_id,
          opening_crawl: film.opening_crawl,
          director: film.director,
          producer: film.producer,
          release_date: film.release_date,
          species: film.species,
          starships: film.starships,
          vehicles: film.vehicles,
          characters: film.characters,
          planets: film.planets,
          url: film.url,
          created: film.created,
          edited: film.edited,
        };

        if (existingMovie) {
          this.moviesRepository.merge(existingMovie, movieData);
          return this.moviesRepository.save(existingMovie);
        } else {
          const newMovie = this.moviesRepository.create(movieData);
          return this.moviesRepository.save(newMovie);
        }
      }),
    );
  }
}
