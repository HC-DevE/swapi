import { People } from 'src/peoples/entities/people.entity';
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
// import { ManyToMany, JoinTable, ManyToOne  } from 'typeorm';

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

  @ManyToMany(() => People)
  @JoinTable()
  characters: string[];

  // @ManyToMany(type => Planets, { cascade: true })
  // @JoinTable()
  // planets: string[];

  @ManyToMany(() => Starship, { cascade: true })
  @JoinTable()
  starships: string[];

  @ManyToMany(() => Vehicle, { cascade: true })
  @JoinTable()
  vehicles: string[];

  @ManyToMany(() => Specie, { cascade: true })
  @JoinTable()
  species: string[];

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
