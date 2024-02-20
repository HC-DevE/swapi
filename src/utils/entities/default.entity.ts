import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class DefaultEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    name: 'created',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'edited',
  })
  updatedAt: Date;
}
