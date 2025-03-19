import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  releaseYear: number;

  @Column()
  genre: string;

  @Column()
  director: string;

  @Column({ nullable: true })
  url: string;
}
