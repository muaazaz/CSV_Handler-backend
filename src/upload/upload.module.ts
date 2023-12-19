import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [FileModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
