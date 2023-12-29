import { Expose, Transform } from 'class-transformer';
import { UploadedFile } from 'src/uploaded-file/entities/uploaded-file.entity';

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

  @Transform(({ value }) => {
    return value ? value.length : 0;
  })
  @Expose()
  uploadedFiles: UploadedFile[];
}
