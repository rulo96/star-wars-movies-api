import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MoviesService } from '../movies.service';

@Injectable()
export class SyncMoviesTask {
  private readonly logger = new Logger(SyncMoviesTask.name);

  constructor(private readonly moviesService: MoviesService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    this.logger.debug('Iniciando sincronización de películas con SWAPI');
    try {
      const movies = await this.moviesService.syncWithSwapi();
      this.logger.debug(
        `Sincronizacion completada. ${movies.length} peliculas sincronizadas.`,
      );
    } catch (error) {
      this.logger.error('Error durante la sincronización de películas:', error);
    }
  }
}
