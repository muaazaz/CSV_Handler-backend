import { Comparison } from 'src/comparison/entities/comparison.entity';
import { UploadedFile } from 'src/uploaded-file/entities/uploaded-file.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
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

  @OneToMany(() => UploadedFile, (file) => file.tag)
  uploadedFiles: UploadedFile[];

  @ManyToMany(() => Comparison, (comparison) => comparison.tags)
  comparisons: Comparison[];
}
