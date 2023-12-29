import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CsvData } from './entities/csvData.entity';
import { CreateCsvDataDto } from './dto/create-csvData.dto';
import { UpdateCsvDataDto } from './dto/update-csvData.dto';

@Injectable()
export class CsvDataService {
  constructor(
    @InjectRepository(CsvData) private csvRepository: Repository<CsvData>,
  ) {}
  create(createCsvDto: CreateCsvDataDto) {
    return this.csvRepository.save(createCsvDto);
  }

  findAll(id: number) {
    return this.csvRepository.find({
      where: { uploadedFile: { id } },
      relations: ['uploadedFile'],
    });
  }

  findOne(id: number) {
    return this.csvRepository.findOneBy({ id });
  }

  update(id: number, updateCsvDataDto: UpdateCsvDataDto) {
    return this.csvRepository.update(id, updateCsvDataDto);
  }

  remove(id: number) {
    return this.csvRepository.delete(id);
  }
}
