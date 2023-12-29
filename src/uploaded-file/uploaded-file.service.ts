import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import { IsNull, Not } from 'typeorm';
import { UploadedFile } from './entities/uploaded-file.entity';
import { CreateUploadedFileDto } from './dto/create-uploaded-file.dto';
import { UpdateUploadDto } from 'src/upload/dto/update-upload.dto';

@Injectable()
export class UploadedFileService {
  constructor(
    @InjectRepository(UploadedFile)
    private uploadedFileRepository: Repository<UploadedFile>,
  ) {}
  async create(createFileDto: CreateUploadedFileDto) {
    const file = this.uploadedFileRepository.create({
      ...createFileDto,
      fieldName: createFileDto.fieldname,
      fileName: createFileDto.filename,
      originalName: createFileDto.originalname,
    });
    const fileData: any = await this.readFileData(createFileDto);
    return { ...fileData, file: await this.uploadedFileRepository.save(file) };
  }

  async findAll(search: string) {
    if (search !== undefined) {
      return this.uploadedFileRepository
        .createQueryBuilder('file')
        .innerJoinAndSelect('file.tag', 'tag')
        .where('LOWER(file.originalName) LIKE :search', {
          search: `%${search.toLowerCase()}%`,
        })
        .orWhere('LOWER(tag.name) LIKE :search', {
          search: `%${search.toLowerCase()}%`,
        })
        .andWhere('tag.id IS NOT NULL')
        .getMany();
    } else {
      return this.uploadedFileRepository.find({
        where: {
          tag: Not(IsNull()),
        },
        relations: ['tag'],
      });
    }
  }

  findOne(id: number) {
    return this.uploadedFileRepository.findOne({
      where: { id },
      relations: ['csvData'],
    });
  }

  update(id: number, updateFileDto: UpdateUploadDto) {
    return this.uploadedFileRepository.update(id, updateFileDto);
  }

  remove(id: number) {
    return this.uploadedFileRepository.delete(id);
  }

  readFileData = (file: CreateUploadedFileDto) =>
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
