import { Injectable } from '@nestjs/common';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { UploadedFileService } from 'src/uploaded-file/uploaded-file.service';

@Injectable()
export class UploadService {
  constructor(private uploadedFileService: UploadedFileService) {}
  uploadFile(createUploadDto: CreateUploadDto) {
    return this.uploadedFileService.create(createUploadDto);
  }

  findAll() {
    return `This action returns all upload`;
  }

  findOne(id: number) {
    return `This action returns a #${id} upload`;
  }

  update(id: number, updateUploadDto: UpdateUploadDto) {
    return `This action updates a #${id} upload`;
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  }
}
