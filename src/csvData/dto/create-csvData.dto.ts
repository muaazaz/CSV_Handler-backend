import { UploadedFile } from 'src/uploaded-file/entities/uploaded-file.entity';

export class CreateCsvDataDto {
  firstName: string;

  lastName: string;

  contact: string;

  company: string;

  uploadedFile: UploadedFile;
}
