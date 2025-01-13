import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/products/entities/product.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { from, Observable } from 'rxjs';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity) private readonly categoriesRepository : Repository<CategoryEntity>
  ){}
  create(createCategoryDto: CreateCategoryDto) : Observable<CreateCategoryDto> {
    return from(this.categoriesRepository.save(createCategoryDto));
  }

  findAll() : Observable<CreateCategoryDto[]> {
    return from(this.categoriesRepository.find({relations:['products']}));
  }

  findOne(id: number) : Observable<CreateCategoryDto> {
    return from(this.categoriesRepository.findOne({where : {id}}));
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) :  Observable<UpdateResult> {
    return from(this.categoriesRepository.update(id,updateCategoryDto));
  }

  remove(id: number) : Observable<DeleteResult> {
    return from(this.categoriesRepository.delete(id));
  }
}
