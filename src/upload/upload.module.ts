import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { UploadedFileModule } from 'src/uploaded-file/uploaded-file.module';

@Module({
  imports: [UploadedFileModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
