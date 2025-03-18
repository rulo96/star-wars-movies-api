import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({ example: 'A New Hope', description: 'Título de la película' })
  @IsString()
  title: string;

  @ApiProperty({ example: 4, description: 'Número de episodio' })
  @IsNumber()
  episode_id: number;

  @ApiProperty({
    example: 'It is a period of civil war...',
    description: 'Texto de apertura',
  })
  @IsString()
  opening_crawl: string;

  @ApiProperty({
    example: 'George Lucas',
    description: 'Director de la película',
  })
  @IsString()
  director: string;

  @ApiProperty({
    example: 'Gary Kurtz, Rick McCallum',
    description: 'Productor(es) de la película',
  })
  @IsString()
  producer: string;

  @ApiProperty({ example: '1977-05-25', description: 'Fecha de estreno' })
  @IsString()
  release_date: string;

  @ApiProperty({
    example: ['https://swapi.dev/api/people/1/'],
    description: 'URLs de personajes',
    type: [String],
  })
  @IsArray()
  @IsOptional()
  characters?: string[];

  @ApiProperty({
    example: ['https://swapi.dev/api/planets/1/'],
    description: 'URLs de planetas',
    type: [String],
  })
  @IsArray()
  @IsOptional()
  planets?: string[];

  @ApiProperty({
    example: ['https://swapi.dev/api/starships/2/'],
    description: 'URLs de naves espaciales',
    type: [String],
  })
  @IsArray()
  @IsOptional()
  starships?: string[];

  @ApiProperty({
    example: ['https://swapi.dev/api/vehicles/4/'],
    description: 'URLs de vehículos',
    type: [String],
  })
  @IsArray()
  @IsOptional()
  vehicles?: string[];

  @ApiProperty({
    example: ['https://swapi.dev/api/species/1/'],
    description: 'URLs de especies',
    type: [String],
  })
  @IsArray()
  @IsOptional()
  species?: string[];

  @ApiProperty({
    example: '2014-12-10T14:23:31.880000Z',
    description: 'Fecha de creación en la API',
  })
  @IsString()
  created: string;

  @ApiProperty({
    example: '2014-12-20T19:49:45.256000Z',
    description: 'Fecha de última edición en la API',
  })
  @IsString()
  edited: string;

  @ApiProperty({
    example: 'https://swapi.dev/api/films/1/',
    description: 'URL de la película en la API',
  })
  @IsString()
  url: string;
}
