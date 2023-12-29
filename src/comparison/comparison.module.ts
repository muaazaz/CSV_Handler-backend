import { Module } from '@nestjs/common';
import { ComparisonService } from './comparison.service';
import { ComparisonController } from './comparison.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comparison } from './entities/comparison.entity';
import { ReportModule } from 'src/report/report.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comparison]), ReportModule],
  controllers: [ComparisonController],
  providers: [ComparisonService],
})
export class ComparisonModule {}
