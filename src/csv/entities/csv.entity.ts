import { File } from 'src/file/entities/file.entity';
import { Report } from 'src/report/entities/report.entity';
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
export class Csv {
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => File, (file) => file.csvId)
  @JoinColumn()
  fileId: number;

  @ManyToOne(() => Report, (report) => report.matchedRecords)
  @JoinColumn()
  report: Report;
}
