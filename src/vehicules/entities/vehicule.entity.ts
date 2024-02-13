// vehicle.entity.ts
import { Film } from 'src/films/entities/film.entity';
import { People } from 'src/peoples/entities/people.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity({ name: 'vehicle' })
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  vehicle_class: string;

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
  cargo_capacity: string;

  @Column({ type: 'varchar', length: 255 })
  consumables: string;

  @ManyToMany(() => Film, { cascade: true })
  @JoinTable()
  films: string[];

  @ManyToMany(() => People, { cascade: true })
  @JoinTable()
  pilots: string[];

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
