import {
  Entity,
  Column,
  // PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Film } from '../../films/entities/film.entity'; // Assurez-vous d'importer l'entité Film
import { People } from '../../people/entities/people.entity'; // Assurez-vous d'importer l'entité People
import { Specie } from 'src/species/entities/species.entity';
import { DefaultEntity } from 'src/utils/entities/default.entity';

@Entity()
export class Planet extends DefaultEntity {
  // @PrimaryGeneratedColumn()
  // id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  diameter: string;

  @Column({ type: 'varchar', length: 255 })
  rotation_period: string;

  @Column({ type: 'varchar', length: 255 })
  orbital_period: string;

  @Column({ type: 'varchar', length: 255 })
  gravity: string;

  @Column({ type: 'varchar', length: 255 })
  population: string;

  @Column({ type: 'varchar', length: 255 })
  climate: string;

  @Column({ type: 'varchar', length: 255 })
  terrain: string;

  @Column({ type: 'varchar', length: 255 })
  surface_water: string;

  @ManyToMany(() => Film) //one to many
  @JoinTable()
  films: Film[];

  @OneToMany(() => People, (people) => people.homeworld)
  @JoinTable()
  residents: People[];

  @OneToMany(() => Specie, (specie) => specie.homeworld)
  @JoinTable()
  species: Specie[];

  @Column('text')
  url: string;

  // @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  // created: Date;

  // @Column('timestamp', {
  //   default: () => 'CURRENT_TIMESTAMP',
  //   onUpdate: 'CURRENT_TIMESTAMP',
  // })
  // edited: Date;
}
