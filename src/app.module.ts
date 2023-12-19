import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileModule } from './file/file.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from './config/configuration';
import { UploadModule } from './upload/upload.module';
import { join } from 'path';
import { CsvModule } from './csv/csv.module';
import { TagsModule } from './tags/tags.module';
import { ReportModule } from './report/report.module';
import { MatchedRecordsModule } from './matched-records/matched-records.module';
import { ComparisonModule } from './comparison/comparison.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('db.host'),
        port: configService.get('db.port'),
        username: configService.get('db.user'),
        password: configService.get('db.password'),
        database: configService.get('db.database'),
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        synchronize: true,
        autoLoadEntities: true,
        logging: false,
      }),
      inject: [ConfigService],
    }),
    FileModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
      load: [configuration],
    }),
    UploadModule,
    CsvModule,
    TagsModule,
    ReportModule,
    MatchedRecordsModule,
    ComparisonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
