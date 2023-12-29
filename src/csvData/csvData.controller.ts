import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CsvDataService } from './csvData.service';
import { CreateCsvDataDto } from './dto/create-csvData.dto';
import { UpdateCsvDataDto } from './dto/update-csvData.dto';

@Controller('csv-data')
export class CsvController {
  constructor(private readonly csvDataService: CsvDataService) {}

  @Post()
  create(@Body() createCsvDto: CreateCsvDataDto) {
    return this.csvDataService.create(createCsvDto);
  }

  @Get()
  findAll(@Param('id') id: string) {
    return this.csvDataService.findAll(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.csvDataService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCsvDto: UpdateCsvDataDto) {
    return this.csvDataService.update(+id, updateCsvDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.csvDataService.remove(+id);
  }
}
