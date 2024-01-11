import { Injectable } from '@nestjs/common';
import { CreateComparisonDto } from './dto/create-comparison.dto';
import { UpdateComparisonDto } from './dto/update-comparison.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comparison } from './entities/comparison.entity';
import { Repository } from 'typeorm';
import { ReportService } from 'src/report/report.service';
import { Tag } from 'src/tags/entities/tag.entity';

@Injectable()
export class ComparisonService {
  constructor(
    @InjectRepository(Comparison)
    private comparisonRepository: Repository<Comparison>,
    private reportService: ReportService,
  ) {}
  async create(createComparisonDto: CreateComparisonDto) {
    const { tags } = createComparisonDto;
    const searchTags = tags.map((tag: Tag) => tag.id);
    const matchedRecords = await this.comparisonRepository.query(`
      Select Distinct C1.id,
      tg1.name AS Tag1Name, tg2.name AS Tag2Name,
      fi1.fileNumber AS File1No, fi2.fileNumber AS File2No
      from csv_data AS C1
      Join csv_data As C2 ON C1.id != C2.id
      Inner Join uploaded_file AS fi1 ON C1.uploadedFileId = fi1.id
      Inner Join uploaded_file AS fi2 ON C2.uploadedFileId = fi2.id
      Inner Join tag AS tg1 ON fi1.tagId = tg1.id
      Inner Join tag AS tg2 ON fi2.tagId = tg2.id
      where fi1.tagId IN (${searchTags}) AND
      fi2.tagId IN (${searchTags}) AND
      C1.firstName = C2.firstName AND
      C1.lastName = C2.lastName AND
      C1.contact = C2.contact AND
      C1.company = C2.company AND
      fi1.id < fi2.id; 
      `);
    // AND tg1.name <> tg2.name;

    const reports = {};
    const generatedReports: any = [];
    matchedRecords.forEach((record: any) => {
      if (
        reports[
          `${record.Tag1Name} File# ${record.File1No} - ${record.Tag2Name} File# ${record.File2No}`
        ]
      ) {
        reports[
          `${record.Tag1Name} File# ${record.File1No} - ${record.Tag2Name} File# ${record.File2No}`
        ].push({ id: record.id });
      } else {
        reports[
          `${record.Tag1Name} File# ${record.File1No} - ${record.Tag2Name} File# ${record.File2No}`
        ] = [{ id: record.id }];
      }
    });

    const entries = Object.entries(reports);

    for (const [key, val] of entries) {
      const report = await this.reportService.create({
        title: key,
        matchedRecords: val,
      });
      generatedReports.push(report);
    }
    const comparison = this.comparisonRepository.create({
      reports: generatedReports,
      tags: tags,
    });
    return this.comparisonRepository.save(comparison);
  }

  findAll() {
    return this.comparisonRepository.find({ relations: ['tags'] });
  }

  findOne(id: number) {
    return this.comparisonRepository.findOne({
      where: { id },
      relations: ['reports', 'reports.matchedRecords'],
    });
  }

  update(id: number, updateComparisonDto: UpdateComparisonDto) {
    return `This action updates a #${id} comparison`;
  }

  remove(id: number) {
    return `This action removes a #${id} comparison`;
  }
}
