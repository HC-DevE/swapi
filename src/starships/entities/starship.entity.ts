// starship.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  // ManyToMany,
  // JoinTable,
} from 'typeorm';

@Entity({ name: 'starship' })
export class Starship {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  starship_class: string;

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
  hyperdrive_rating: string;

  @Column({ type: 'varchar', length: 255 })
  MGLT: string;

  @Column({ type: 'varchar', length: 255 })
  cargo_capacity: string;

  @Column({ type: 'varchar', length: 255 })
  consumables: string;

  // @ManyToMany(type => Film, { cascade: true })
  // @JoinTable()
  // films: Film[];

  // @ManyToMany(type => People, { cascade: true })
  // @JoinTable()
  // pilots: People[];

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
