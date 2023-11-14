import { Film } from 'src/films/entities/film.entity';
import { Starship } from 'src/starships/entities/starship.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
// import { ManyToMany, JoinTable, ManyToOne  } from 'typeorm';

// import { Species } from './species.entity'; // Assurez-vous d'importer l'entité Species
// import { Vehicle } from './vehicle.entity'; // Assurez-vous d'importer l'entité Vehicle
// import { Planet } from './planet.entity'; // Assurez-vous d'importer l'entité Planet

@Entity()
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

  // @ManyToOne(type => Planet)
  // @JoinTable()
  // homeworld: Planet;

  @ManyToMany(() => Film, { cascade: true })
  @JoinTable()
  films: Film[];

  // @ManyToMany(type => Species, { cascade: true })
  // @JoinTable()
  // species: Species[];

  // @ManyToMany(type => Vehicle, { cascade: true })
  // @JoinTable()
  // vehicles: Vehicle[];

  @ManyToMany(() => Starship, { cascade: true })
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
