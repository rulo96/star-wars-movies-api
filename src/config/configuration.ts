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

interface AppConfig {
  port: number;
  database: DatabaseConfig;
  jwt: JwtConfig;
  swapi: SwapiConfig;
}

export const configuration = (): AppConfig => ({
  port: parseInt(process.env.PORT || '3000', 10),
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '3306', 10),
    username: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || 'root',
    database: process.env.DATABASE_NAME || 'star-wars-db',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secretKey',
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  },
  swapi: {
    baseUrl: 'https://swapi.dev/api',
  },
});
