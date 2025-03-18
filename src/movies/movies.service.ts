import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity.ts';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import {
  SwapiFilm,
  SwapiResponse,
} from '../common/interfaces/swapi-response.interface';

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

  async findOne(id: number): Promise<Movie> {
    const movie = await this.moviesRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException(`Película con ID ${id} no encontrada`);
    }
    return movie;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.findOne(id);
    this.moviesRepository.merge(movie, updateMovieDto);
    return this.moviesRepository.save(movie);
  }

  async remove(id: number): Promise<void> {
    const movie = await this.findOne(id);
    await this.moviesRepository.remove(movie);
  }

  async syncWithSwapi(): Promise<Movie[]> {
    const baseUrl = this.configService.get<string>('swapi.baseUrl');
    const response = await firstValueFrom(
      this.httpService.get<SwapiResponse<SwapiFilm>>(`${baseUrl}/films/`),
    );

    const films = response.data.results;
    const savedMovies: Movie[] = [];

    for (const film of films) {
      // Verificar si la película ya existe en la base de datos
      const existingMovie = await this.moviesRepository.findOne({
        where: { url: film.url },
      });

      if (existingMovie) {
        // Actualizar película existente
        this.moviesRepository.merge(existingMovie, film);
        savedMovies.push(await this.moviesRepository.save(existingMovie));
      } else {
        // Crear nueva película
        const newMovie = this.moviesRepository.create(film);
        savedMovies.push(await this.moviesRepository.save(newMovie));
      }
    }

    return savedMovies;
  }
}
