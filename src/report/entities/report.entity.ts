import { Comparison } from 'src/comparison/entities/comparison.entity';
import { Csv } from 'src/csv/entities/csv.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Comparison, (comparison) => comparison.reports)
  @JoinColumn()
  comparison: Comparison;

  @OneToMany(() => Csv, (csv) => csv)
  matchedRecords: Csv[];
}
