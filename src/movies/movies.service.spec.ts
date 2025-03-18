import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity.ts';
import { of } from 'rxjs';
import { NotFoundException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  merge: jest.fn(),
  remove: jest.fn(),
});

describe('MoviesService', () => {
  let service: MoviesService;
  let moviesRepository: MockRepository<Movie>;
  let httpService: HttpService;

  const mockMovie = {
    id: 1,
    title: 'A New Hope',
    episode_id: 4,
    opening_crawl: 'It is a period of civil war...',
    director: 'George Lucas',
    producer: 'Gary Kurtz, Rick McCallum',
    release_date: '1977-05-25',
    characters: ['https://swapi.dev/api/people/1/'],
    planets: ['https://swapi.dev/api/planets/1/'],
    starships: ['https://swapi.dev/api/starships/2/'],
    vehicles: ['https://swapi.dev/api/vehicles/4/'],
    species: ['https://swapi.dev/api/species/1/'],
    created: '2014-12-10T14:23:31.880000Z',
    edited: '2014-12-20T19:49:45.256000Z',
    url: 'https://swapi.dev/api/films/1/',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockSwapiResponse = {
    data: {
      count: 1,
      next: null,
      previous: null,
      results: [
        {
          title: 'A New Hope',
          episode_id: 4,
          opening_crawl: 'It is a period of civil war...',
          director: 'George Lucas',
          producer: 'Gary Kurtz, Rick McCallum',
          release_date: '1977-05-25',
          characters: ['https://swapi.dev/api/people/1/'],
          planets: ['https://swapi.dev/api/planets/1/'],
          starships: ['https://swapi.dev/api/starships/2/'],
          vehicles: ['https://swapi.dev/api/vehicles/4/'],
          species: ['https://swapi.dev/api/species/1/'],
          created: '2014-12-10T14:23:31.880000Z',
          edited: '2014-12-20T19:49:45.256000Z',
          url: 'https://swapi.dev/api/films/1/',
        },
      ],
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getRepositoryToken(Movie),
          useValue: createMockRepository(),
        },
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('https://swapi.dev/api'),
          },
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    moviesRepository = module.get<MockRepository>(getRepositoryToken(Movie));
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of movies', async () => {
      moviesRepository.find.mockResolvedValue([mockMovie]);
      const result = await service.findAll();
      expect(result).toEqual([mockMovie]);
      expect(moviesRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a movie by id', async () => {
      moviesRepository.findOne.mockResolvedValue(mockMovie);
      const result = await service.findOne(1);
      expect(result).toEqual(mockMovie);
      expect(moviesRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException if movie not found', async () => {
      moviesRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(moviesRepository.findOne).toHaveBeenCalledWith({
        where: { id: 999 },
      });
    });
  });

  describe('create', () => {
    it('should create a new movie', async () => {
      const createMovieDto = {
        title: 'A New Hope',
        episode_id: 4,
        opening_crawl: 'It is a period of civil war...',
        director: 'George Lucas',
        producer: 'Gary Kurtz, Rick McCallum',
        release_date: '1977-05-25',
        characters: ['https://swapi.dev/api/people/1/'],
        planets: ['https://swapi.dev/api/planets/1/'],
        starships: ['https://swapi.dev/api/starships/2/'],
        vehicles: ['https://swapi.dev/api/vehicles/4/'],
        species: ['https://swapi.dev/api/species/1/'],
        created: '2014-12-10T14:23:31.880000Z',
        edited: '2014-12-20T19:49:45.256000Z',
        url: 'https://swapi.dev/api/films/1/',
      };

      moviesRepository.create.mockReturnValue(mockMovie);
      moviesRepository.save.mockResolvedValue(mockMovie);

      const result = await service.create(createMovieDto);

      expect(result).toEqual(mockMovie);
      expect(moviesRepository.create).toHaveBeenCalledWith(createMovieDto);
      expect(moviesRepository.save).toHaveBeenCalledWith(mockMovie);
    });
  });

  describe('update', () => {
    it('should update a movie', async () => {
      const updateMovieDto = { title: 'Updated Title' };

      moviesRepository.findOne.mockResolvedValue(mockMovie);
      moviesRepository.merge.mockReturnValue({
        ...mockMovie,
        ...updateMovieDto,
      });
      moviesRepository.save.mockResolvedValue({
        ...mockMovie,
        ...updateMovieDto,
      });

      const result = await service.update(1, updateMovieDto);

      expect(result).toEqual({ ...mockMovie, ...updateMovieDto });
      expect(moviesRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(moviesRepository.merge).toHaveBeenCalledWith(
        mockMovie,
        updateMovieDto,
      );
      expect(moviesRepository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException if movie to update not found', async () => {
      moviesRepository.findOne.mockResolvedValue(null);

      await expect(service.update(999, { title: 'New Title' })).rejects.toThrow(
        NotFoundException,
      );
      expect(moviesRepository.findOne).toHaveBeenCalledWith({
        where: { id: 999 },
      });
    });
  });

  describe('remove', () => {
    it('should remove a movie', async () => {
      moviesRepository.findOne.mockResolvedValue(mockMovie);
      moviesRepository.remove.mockResolvedValue(mockMovie);

      await service.remove(1);

      expect(moviesRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(moviesRepository.remove).toHaveBeenCalledWith(mockMovie);
    });

    it('should throw NotFoundException if movie to remove not found', async () => {
      moviesRepository.findOne.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(moviesRepository.findOne).toHaveBeenCalledWith({
        where: { id: 999 },
      });
    });
  });

  describe('syncWithSwapi', () => {
    it('should sync movies from SWAPI', async () => {
      jest.spyOn(httpService, 'get').mockReturnValue(of(mockSwapiResponse));
      moviesRepository.findOne.mockResolvedValue(null);
      moviesRepository.create.mockReturnValue(mockMovie);
      moviesRepository.save.mockResolvedValue(mockMovie);

      const result = await service.syncWithSwapi();

      expect(result).toEqual([mockMovie]);
      expect(httpService.get).toHaveBeenCalled();
      expect(moviesRepository.findOne).toHaveBeenCalled();
      expect(moviesRepository.create).toHaveBeenCalled();
      expect(moviesRepository.save).toHaveBeenCalled();
    });

    it('should update existing movies during sync', async () => {
      jest.spyOn(httpService, 'get').mockReturnValue(of(mockSwapiResponse));
      moviesRepository.findOne.mockResolvedValue(mockMovie);
      moviesRepository.merge.mockReturnValue(mockMovie);
      moviesRepository.save.mockResolvedValue(mockMovie);

      const result = await service.syncWithSwapi();

      expect(result).toEqual([mockMovie]);
      expect(httpService.get).toHaveBeenCalled();
      expect(moviesRepository.findOne).toHaveBeenCalled();
      expect(moviesRepository.merge).toHaveBeenCalled();
      expect(moviesRepository.save).toHaveBeenCalled();
    });
  });
});
