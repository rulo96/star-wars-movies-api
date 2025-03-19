interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

interface JwtConfig {
  secret: string;
  expiresIn: string;
}

interface SwapiConfig {
  baseUrl: string;
}

export interface AppConfig {
  port: number;
  database: DatabaseConfig;
  jwt: JwtConfig;
  swapi: SwapiConfig;
}
