import { Expose, Transform } from 'class-transformer';
import { File } from 'src/file/entities/file.entity';
import { Tag } from 'src/tags/entities/tag.entity';

export class allFilesDto {
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
  originalname: string;

  @Transform(({ value }) => value?.name)
  @Expose()
  tagId: Tag;
}
