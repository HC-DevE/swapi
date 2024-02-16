import { People } from 'src/people/entities/people.entity';
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
} from 'typeorm';

@Entity({ name: 'film' })
export class Film {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  episod_id: string;

  @Column({ type: 'varchar', length: 255 })
  opening_crawl: string;

  @Column({ type: 'varchar', length: 255 })
  director: string;

  @Column({ type: 'varchar', length: 255 })
  producer: string;

  @Column({ type: 'varchar', length: 255 })
  release_date: string;

  @ManyToMany(() => People, (people) => people.films, {
    nullable: true,
  })
  @JoinTable()
  characters: People[];

  @ManyToMany(() => Planet, (planet) => planet.films, {
    nullable: true,
  })
  @JoinTable()
  planets: Planet[];

  @ManyToMany(() => Starship, (starship) => starship.films, {
    nullable: true,
  })
  @JoinTable()
  starships: Starship[];

  @ManyToMany(() => Vehicle, (vehicle) => vehicle.films, {
    nullable: true,
  })
  @JoinTable()
  vehicles: Vehicle[];

  @ManyToMany(() => Specie, (specie) => specie.films)
  @JoinTable()
  species: Specie[];

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
