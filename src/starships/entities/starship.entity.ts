// starship.entity.ts
import { Film } from 'src/films/entities/film.entity';
import { People } from 'src/people/entities/people.entity';
import { DefaultEntity } from 'src/utils/entities/default.entity';
import {
  Entity,
  Column,
  // PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';

@Entity({ name: 'starship' })
export class Starship extends DefaultEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  model: string;

  @Column({ type: 'varchar', length: 255 })
  starship_class: string;

  @Column({ type: 'varchar', length: 255 })
  manufacturer: string;

  @Column({ type: 'varchar', length: 255 })
  cost_in_credits: string;

  @Column({ type: 'varchar', length: 255 })
  length: string;

  @Column({ type: 'varchar', length: 255 })
  crew: string;

  @Column({ type: 'varchar', length: 255 })
  passengers: string;

  @Column({ type: 'varchar', length: 255 })
  max_atmosphering_speed: string;

  @Column({ type: 'varchar', length: 255 })
  hyperdrive_rating: string;

  @Column({ type: 'varchar', length: 255 })
  MGLT: string;

  @Column({ type: 'varchar', length: 255 })
  cargo_capacity: string;

  @Column({ type: 'varchar', length: 255 })
  consumables: string;

  @ManyToMany(() => Film, (film) => film.starships)
  @JoinTable()
  films: Film[];

  @ManyToMany(() => People, (person) => person.starships)
  @JoinTable()
  pilots: People[];

  // @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  // created: Date;

  // @Column('timestamp', {
  //   default: () => 'CURRENT_TIMESTAMP',
  //   onUpdate: 'CURRENT_TIMESTAMP',
  // })
  // edited: Date;
}
