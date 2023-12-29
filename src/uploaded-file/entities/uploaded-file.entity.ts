import { CsvData } from 'src/csvData/entities/csvData.entity';
import { Tag } from 'src/tags/entities/tag.entity';
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
export class UploadedFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fieldName: string;

  @Column()
  originalName: string;

  @Column()
  fileName: string;

  @Column()
  path: string;

  @Column({ default: 0 })
  fileNumber: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => CsvData, (csv) => csv.uploadedFile)
  csvData: CsvData[];

  @ManyToOne(() => Tag, (tag) => tag.uploadedFiles)
  @JoinColumn()
  tag: Tag;
}
