import { Film } from 'src/films/entities/film.entity';
import { Specie } from 'src/species/entities/species.entity';
import { Starship } from 'src/starships/entities/starship.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
  // ManyToOne,
} from 'typeorm';
// import { ManyToMany, JoinTable, ManyToOne  } from 'typeorm';

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

  // @ManyToOne(() => Planet)
  // @JoinTable()
  // homeworld: string;

  @ManyToMany(() => Film, { cascade: true })
  @JoinTable()
  films: string[];

  @ManyToMany(() => Specie, { cascade: true })
  @JoinTable()
  species: string[];

  // @ManyToMany(() => Vehicule, { cascade: true })
  // @JoinTable()
  // vehicules: string[];

  @ManyToMany(() => Starship, { cascade: true })
  @JoinTable()
  starships: string[];

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
