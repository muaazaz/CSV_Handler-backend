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
  Query,
} from '@nestjs/common';
import { UploadedFileService } from './uploaded-file.service';
import { CreateUploadedFileDto } from './dto/create-uploaded-file.dto';
import { UpdateUploadedFileDto } from './dto/update-uploaded-file.dto';
import { Serialize } from 'src/decorators/serialize.decorator';
import { allFilesDto } from './dto/all-files.dto';

@Controller('uploaded-file')
export class UploadedFileController {
  constructor(private readonly uploadedFileService: UploadedFileService) {}

  @Post()
  create(@Body() createUploadedFileDto: CreateUploadedFileDto) {
    return this.uploadedFileService.create(createUploadedFileDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Serialize(allFilesDto)
  @Get()
  findAll(@Query() query: any) {
    return this.uploadedFileService.findAll(query.search);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadedFileService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUploadedFileDto: UpdateUploadedFileDto,
  ) {
    return this.uploadedFileService.update(+id, updateUploadedFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadedFileService.remove(+id);
  }
}
