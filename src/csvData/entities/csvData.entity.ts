import { Exclude } from 'class-transformer';
import { Report } from 'src/report/entities/report.entity';
import { UploadedFile } from 'src/uploaded-file/entities/uploaded-file.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CsvData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  contact: string;

  @Column()
  company: string;

  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UploadedFile, (file) => file.csvData)
  @JoinColumn()
  uploadedFile: UploadedFile;

  @ManyToMany(() => Report, (report) => report.matchedRecords)
  report: Report[];
}
