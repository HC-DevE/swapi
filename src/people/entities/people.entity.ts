import { Film } from 'src/films/entities/film.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { Specie } from 'src/species/entities/species.entity';
import { Starship } from 'src/starships/entities/starship.entity';
import { Vehicle } from 'src/vehicules/entities/vehicule.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'people' })
export class People {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  height: string;

  @Column({ type: 'varchar', length: 255 })
  mass: string;

  @Column({ type: 'varchar', length: 255 })
  hair_color: string;

  @Column({ type: 'varchar', length: 255 })
  skin_color: string;

  @Column({ type: 'varchar', length: 255 })
  eye_color: string;

  @Column({ type: 'varchar', length: 255 })
  birth_year: string;

  @Column({ type: 'varchar', length: 255 })
  gender: string;

  @ManyToOne(() => Planet)
  @JoinTable()
  homeworld: Planet;

  @ManyToMany(() => Film, (film) => film.characters)
  @JoinTable()
  films: Film[];

  @ManyToMany(() => Specie, (specie) => specie.people)
  @JoinTable()
  species: Specie[];

  @ManyToMany(() => Vehicle, (vehicle) => vehicle.pilots)
  @JoinTable()
  vehicules: Vehicle[];

  @ManyToMany(() => Starship, (starship) => starship.pilots)
  @JoinTable()
  starships: Starship[];

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