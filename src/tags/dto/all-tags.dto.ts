import { Expose, Transform } from 'class-transformer';
import { File } from 'src/file/entities/file.entity';

export class allTagsDto {
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
  name: string;

  @Transform(({ value }) => value.length)
  @Expose()
  filesId: File[];
}
