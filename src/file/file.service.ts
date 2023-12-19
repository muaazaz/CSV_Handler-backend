import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { Repository } from 'typeorm';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import { IsNull, Not } from 'typeorm';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File) private fileRepository: Repository<File>,
  ) {}
  async create(createFileDto: CreateFileDto) {
    const file = this.fileRepository.create(createFileDto);
    const fileData: any = await this.readFileData(createFileDto);
    return { ...fileData, file: await this.fileRepository.save(file) };
  }

  findAll() {
    return this.fileRepository.find({
      where: {
        tagId: Not(IsNull()),
      },
      relations: ['tagId'],
    });
  }

  findOne(id: number) {
    return this.fileRepository.findOneBy({ id });
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return this.fileRepository.update(id, updateFileDto);
  }

  remove(id: number) {
    return this.fileRepository.delete(id);
  }

  readFileData = (file: CreateFileDto) =>
    new Promise((resolve) => {
      const results = [];
      let headers = null;
      fs.createReadStream(file.path)
        .pipe(csv())
        .on('data', (data) => {
          results.push(data);
        })
        .on('end', async () => {
          headers = Object.keys(results[0]);
          resolve({
            fileData: results,
            fileHeaders: headers,
          });
        });
    });
}
