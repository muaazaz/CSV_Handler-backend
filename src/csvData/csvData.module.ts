import { Module } from '@nestjs/common';
import { CsvDataService } from './csvData.service';
import { CsvController } from './csvData.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CsvData } from './entities/csvData.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CsvData])],
  controllers: [CsvController],
  providers: [CsvDataService],
  exports: [CsvDataService],
})
export class CsvDataModule {}
