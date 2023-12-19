import { Injectable } from '@nestjs/common';
import { CreateCsvDto } from './dto/create-csv.dto';
import { UpdateCsvDto } from './dto/update-csv.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Csv } from './entities/csv.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CsvService {
  constructor(@InjectRepository(Csv) private csvRepository: Repository<Csv>) {}
  create(createCsvDto: CreateCsvDto) {
    return this.csvRepository.save(createCsvDto);
  }

  findAll(id: number) {
    return this.csvRepository.find({
      where: { fileId: id },
      relations: ['fileId'],
    });
  }

  findOne(id: number) {
    return this.csvRepository.findOneBy({ id });
  }

  update(id: number, updateCsvDto: UpdateCsvDto) {
    return this.csvRepository.update(id, updateCsvDto);
  }

  remove(id: number) {
    return this.csvRepository.delete(id);
  }
}
