import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  episode_id: number;

  @Column('text')
  opening_crawl: string;

  @Column()
  director: string;

  @Column()
  producer: string;

  @Column({ type: 'date' })
  release_date: string;

  @Column('simple-array')
  species: string[];

  @Column('simple-array')
  starships: string[];

  @Column('simple-array')
  vehicles: string[];

  @Column('simple-array')
  characters: string[];

  @Column('simple-array')
  planets: string[];

  @Column()
  url: string;

  @Column()
  created: string;

  @Column()
  edited: string;
}
