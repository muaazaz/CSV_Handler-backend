import { Expose, Transform } from 'class-transformer';
import { Tag } from 'src/tags/entities/tag.entity';

export class allFilesDto {
  @Expose()
  id: number;

  @Transform(({ value }) =>
    value.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }),
  )
  @Expose()
  createdAt: Date;

  @Expose()
  originalName: string;

  @Transform(({ value }) => value?.name)
  @Expose()
  tag: Tag;
}
