import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ComparisonService } from './comparison.service';
import { CreateComparisonDto } from './dto/create-comparison.dto';
import { UpdateComparisonDto } from './dto/update-comparison.dto';
import { Serialize } from 'src/decorators/serialize.decorator';
import { AllComparisonsDto } from './dto/all-comparisons.dto';
import { ComparisonDetailDto } from './dto/comparison-details.dto';

@Controller('comparison')
export class ComparisonController {
  constructor(private readonly comparisonService: ComparisonService) {}

  @Post()
  create(@Body() createComparisonDto: CreateComparisonDto) {
    return this.comparisonService.create(createComparisonDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Serialize(AllComparisonsDto)
  @Get()
  findAll() {
    return this.comparisonService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Serialize(ComparisonDetailDto)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comparisonService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateComparisonDto: UpdateComparisonDto,
  ) {
    return this.comparisonService.update(+id, updateComparisonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comparisonService.remove(+id);
  }
}
