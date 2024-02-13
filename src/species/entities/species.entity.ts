// species.entity.ts

//import { Planet } from 'src/planets/entities/planets.entity';
import { Film } from 'src/films/entities/film.entity';
import { People } from 'src/peoples/entities/people.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
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

  //@ManyToOne((type) => Planet)
  //@JoinTable()
  //homeworld: Planet;

  @Column({ type: 'varchar', length: 255 })
  language: string;

  @ManyToMany(() => People, { cascade: true })
  @JoinTable()
  people: string[];

  @ManyToMany(() => Film, { cascade: true })
  @JoinTable()
  films: string[];

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
