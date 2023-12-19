import { Report } from 'src/report/entities/report.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  Column,
  getConnection,
  OneToMany,
} from 'typeorm';

@Entity()
export class Comparison {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comparisonNumber: number;

  @OneToMany(() => Tag, (tag) => tag)
  tags: Tag[];

  @OneToMany(() => Report, (report) => report)
  reports: Report[];

  @BeforeInsert()
  async updateYourColumnBeforeInsert() {
    if (!this.comparisonNumber) {
      // Fetch the maximum value from the database
      const connection = getConnection();
      const queryRunner = connection.createQueryRunner();

      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        const maxResult = await queryRunner.query(
          `SELECT MAX(comparisonNumber) AS max FROM comparison`,
        );
        const max = maxResult[0].max;

        // Set the next value for yourColumn
        this.comparisonNumber = (max || 0) + 1;

        await queryRunner.commitTransaction();
      } catch (err) {
        // Handle error
        await queryRunner.rollbackTransaction();
      } finally {
        await queryRunner.release();
      }
    }
  }
}
