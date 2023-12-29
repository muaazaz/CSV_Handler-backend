import { Comparison } from 'src/comparison/entities/comparison.entity';
import { CsvData } from 'src/csvData/entities/csvData.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Comparison, (comparison) => comparison.reports)
  comparison: Comparison;

  @ManyToMany(() => CsvData, (csv) => csv.report)
  @JoinTable()
  matchedRecords: CsvData[];
}
