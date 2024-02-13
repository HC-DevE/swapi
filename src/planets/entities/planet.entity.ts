import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Film } from '../../films/entities/film.entity'; // Assurez-vous d'importer l'entité Film
import { People } from '../../peoples/entities/people.entity'; // Assurez-vous d'importer l'entité People

@Entity()
export class Planet {
  @PrimaryGeneratedColumn()
  id: number;

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

  @ManyToMany(() => Film, { cascade: true })
  @JoinTable()
  films: string[];

  @ManyToMany(() => People, { cascade: true })
  @JoinTable()
  residents: string[];

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
