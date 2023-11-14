import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// import { ManyToMany, JoinTable, ManyToOne  } from 'typeorm';

// import { Film } from './film.entity'; // Assurez-vous d'importer l'entité Film
// import { Species } from './species.entity'; // Assurez-vous d'importer l'entité Species
// import { Vehicle } from './vehicle.entity'; // Assurez-vous d'importer l'entité Vehicle
// import { Starship } from './starship.entity'; // Assurez-vous d'importer l'entité Starship
// import { Planet } from './planet.entity'; // Assurez-vous d'importer l'entité Planet

@Entity()
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

  // @ManyToMany(type => Peoples)
  // @JoinTable()
  // peoples: People[];

  // @ManyToMany(type => Planets, { cascade: true })
  // @JoinTable()
  // planets: Planet[];

  // @ManyToMany(type => Species, { cascade: true })
  // @JoinTable()
  // species: Species[];

  // @ManyToMany(type => Vehicle, { cascade: true })
  // @JoinTable()
  // vehicles: Vehicle[];

  // @ManyToMany(type => Starship, { cascade: true })
  // @JoinTable()
  // starships: Starship[];

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
