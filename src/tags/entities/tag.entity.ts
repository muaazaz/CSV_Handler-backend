import { Comparison } from 'src/comparison/entities/comparison.entity';
import { File } from 'src/file/entities/file.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => File, (file) => file.tagId)
  filesId: File[];

  @ManyToOne(() => Comparison, (comparison) => comparison.tags)
  @JoinColumn()
  comparison: Comparison;
}
