import { Expose, Transform } from 'class-transformer';
import { CsvData } from 'src/csvData/entities/csvData.entity';
import { Report } from 'src/report/entities/report.entity';

export class ComparisonDetailDto {
  @Expose()
  id: number;

  @Transform(({ obj }) => {
    return `Comparison# 0000${obj.id} - ${obj.createdAt.toLocaleDateString(
      'en-US',
      {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      },
    )}`;
  })
  @Expose()
  title: string;

  @Transform(({ value }) => {
    const serializedReports = value.map((report: Report) => {
      const matchedRecords = report.matchedRecords.map((csvData: CsvData) => ({
        id: csvData.id,
        firstName: csvData.firstName,
        lastName: csvData.lastName,
        contact: csvData.contact,
        company: csvData.company,
      }));
      return {
        id: report.id,
        title: report.title,
        matchedRecords,
      };
    });
    return serializedReports;
  })
  @Expose()
  reports: Report[];
}
