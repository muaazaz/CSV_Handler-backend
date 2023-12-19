import { Injectable } from '@nestjs/common';
import { CreateComparisonDto } from './dto/create-comparison.dto';
import { UpdateComparisonDto } from './dto/update-comparison.dto';

@Injectable()
export class ComparisonService {
  create(createComparisonDto: CreateComparisonDto) {
    return 'This action adds a new comparison';
  }

  findAll() {
    return `This action returns all comparison`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comparison`;
  }

  update(id: number, updateComparisonDto: UpdateComparisonDto) {
    return `This action updates a #${id} comparison`;
  }

  remove(id: number) {
    return `This action removes a #${id} comparison`;
  }
}
