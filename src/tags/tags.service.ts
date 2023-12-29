import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tag) private tagRepository: Repository<Tag>) {}
  create(createTagDto: CreateTagDto) {
    const tag = this.tagRepository.create(createTagDto);
    return this.tagRepository.save(tag);
  }

  async findAll(type: string) {
    if (type !== 'undefined') {
      const tags = await this.tagRepository
        .createQueryBuilder('tags')
        .leftJoinAndSelect('tags.uploadedFiles', 'files')
        .where('files.id IS NOT NULL')
        .getMany();
      return tags;
    }
    const tags = await this.tagRepository.find({
      relations: ['uploadedFiles'],
    });
    return tags;
  }

  findOne(id: number) {
    return this.tagRepository.findOneBy({ id });
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return this.tagRepository.update(id, updateTagDto);
  }

  async remove(id: number) {
    const tag = await this.tagRepository.findOne({
      where: { id },
      relations: ['uploadedFiles'],
    });
    if (tag.uploadedFiles.length > 0) {
      const error = 'Cannot Delete tags which are related to some files';
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error,
        },
        HttpStatus.FORBIDDEN,
      );
    }
    return this.tagRepository.remove(tag);
  }
}
