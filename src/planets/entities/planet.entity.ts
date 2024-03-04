import {
  Entity,
  Column,
  // PrimaryGeneratedColumn,
  ManyToMany,
  // JoinTable,
  OneToMany,
} from 'typeorm';
import { Film } from '../../films/entities/film.entity'; // Assurez-vous d'importer l'entité Film
import { People } from '../../people/entities/people.entity'; // Assurez-vous d'importer l'entité People
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

  @ManyToMany(() => Film, (film) => film.planets, {
    nullable: true,
  }) //one to many
  films: Film[];

  @OneToMany(() => People, (people) => people.homeworld, {
    nullable: true,
  })
  residents: People[];

  // @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  // created: Date;

  // @Column('timestamp', {
  //   default: () => 'CURRENT_TIMESTAMP',
  //   onUpdate: 'CURRENT_TIMESTAMP',
  // })
  // edited: Date;
}
