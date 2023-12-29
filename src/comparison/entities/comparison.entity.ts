import { Report } from 'src/report/entities/report.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Comparison {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Tag, (tag) => tag)
  @JoinTable()
  tags: Tag[];

  @OneToMany(() => Report, (report) => report.comparison)
  reports: Report[];
}
