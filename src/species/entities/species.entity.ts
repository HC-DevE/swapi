// species.entity.ts

//import { Planet } from 'src/planets/entities/planets.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Specie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  classification: string;

  @Column({ type: 'varchar', length: 255 })
  designation: string;

  @Column({ type: 'varchar', length: 255 })
  average_height: string;

  @Column({ type: 'varchar', length: 255 })
  average_lifespan: string;

  @Column({ type: 'varchar', length: 255 })
  hair_colors: string;

  @Column({ type: 'varchar', length: 255 })
  skin_colors: string;

  @Column({ type: 'varchar', length: 255 })
  eye_colors: string;

  //@ManyToOne((type) => Planet)
  //@JoinTable()
  //homeworld: Planet;

  @Column({ type: 'varchar', length: 255 })
  language: string;

  //@ManyToMany((type) => People, { cascade: true })
  //@JoinTable()
  //people: People[];

  //@ManyToMany((type) => Film, { cascade: true })
  //@JoinTable()
  //films: Film[];

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
