import { Expose, Transform } from 'class-transformer';
import { Report } from 'src/report/entities/report.entity';
import { Tag } from 'src/tags/entities/tag.entity';

export class AllComparisonsDto {
  @Expose()
  id: number;

  @Transform(({ obj }) => {
    return `Comparison# 0000${obj.id}`;
  })
  @Expose()
  comparisonNumber: string;

  @Transform(({ value }) => {
    const tags = value.map((tag: Tag) => tag.name);
    return tags;
  })
  @Expose()
  tags: Tag[];

  @Transform(({ value }) =>
    value.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }),
  )
  @Expose()
  createdAt: Date;
}
