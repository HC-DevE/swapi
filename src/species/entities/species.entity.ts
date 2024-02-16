// species.entity.ts

import { Film } from 'src/films/entities/film.entity';
import { People } from 'src/people/entities/people.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'specie' })
export class Specie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  classification: string;

  @Column({ type: 'varchar', length: 255 })
  designation: string;

  @Column({ type: 'varchar', length: 255 })
  average_height: string;

  @Column({ type: 'varchar', length: 255 })
  average_lifespan: string;

  @Column({ type: 'varchar', length: 255 })
  hair_colors: string;

  @Column({ type: 'varchar', length: 255 })
  skin_colors: string;

  @Column({ type: 'varchar', length: 255 })
  eye_colors: string;

  @ManyToOne(() => Planet, (planet) => planet.species)
  @JoinTable()
  homeworld: Planet;

  @Column({ type: 'varchar', length: 255 })
  language: string;

  @ManyToMany(() => People, (people) => people.species)
  @JoinTable()
  people: People[];

  @ManyToMany(() => Film, (film) => film.species)
  @JoinTable()
  films: Film[];

  @Column('text')
  url: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  edited: Date;
}
