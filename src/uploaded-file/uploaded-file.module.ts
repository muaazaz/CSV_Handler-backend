import { Module } from '@nestjs/common';
import { UploadedFileService } from './uploaded-file.service';
import { UploadedFileController } from './uploaded-file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadedFile } from './entities/uploaded-file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UploadedFile])],
  controllers: [UploadedFileController],
  providers: [UploadedFileService],
  exports: [UploadedFileService],
})
export class UploadedFileModule {}
