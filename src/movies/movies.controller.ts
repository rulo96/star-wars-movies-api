import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { JwtAuthGuard, Roles } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
//import { Roles }
import { Role } from '../common/enums/role.enum';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una nueva película' })
  @ApiResponse({
    status: 201,
    description: 'La película ha sido creada exitosamente.',
  })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  @ApiResponse({
    status: 403,
    description: 'Prohibido - Se requiere rol de administrador.',
  })
  async create(@Body() createMovieDto: CreateMovieDto) {
    try {
      return await this.moviesService.create(createMovieDto);
    } catch (error) {
      console.error('Error al crear la pelicula:', error);
      throw new BadRequestException(
        'No se pudo crear la película. Verifica los datos enviados.',
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las películas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de películas recuperada exitosamente.',
  })
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER, Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener una película por ID' })
  @ApiResponse({ status: 200, description: 'Película encontrada.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  @ApiResponse({ status: 404, description: 'Película no encontrada.' })
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar una película' })
  @ApiResponse({
    status: 200,
    description: 'Película actualizada exitosamente.',
  })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  @ApiResponse({
    status: 403,
    description: 'Prohibido - Se requiere rol de administrador.',
  })
  @ApiResponse({ status: 404, description: 'Película no encontrada.' })
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar una película' })
  @ApiResponse({ status: 200, description: 'Película eliminada exitosamente.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  @ApiResponse({
    status: 403,
    description: 'Prohibido - Se requiere rol de administrador.',
  })
  @ApiResponse({ status: 404, description: 'Película no encontrada.' })
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }

  @Post('sync')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Sincronizar películas con SWAPI' })
  @ApiResponse({
    status: 200,
    description: 'Películas sincronizadas correctamente.',
  })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  @ApiResponse({
    status: 403,
    description: 'Prohibido - Se requiere rol de administrador.',
  })
  async syncMovies() {
    return this.moviesService.syncWithSwapi();
  }
}
