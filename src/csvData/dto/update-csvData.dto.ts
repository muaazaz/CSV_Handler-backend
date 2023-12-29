import { PartialType } from '@nestjs/mapped-types';
import { CreateCsvDataDto } from './create-csvData.dto';

export class UpdateCsvDataDto extends PartialType(CreateCsvDataDto) {}
