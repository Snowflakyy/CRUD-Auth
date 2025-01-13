import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, from, map, mergeMap, Observable, of, throwError } from 'rxjs';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { PostProductDto } from './dto/post-product.dto';
import { CategoriesService } from 'src/categories/categories.service';
import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productsRepository: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    private readonly categoriesService : CategoriesService
  ) {}
   create(userId:number,createProductDto: CreateProductDto): Observable<PostProductDto> {
    const {categoryId, ...productData} = createProductDto
    console.log(userId)
    return from(this.categoryRepository.findOne({ where: { id: categoryId } })).pipe(
      mergeMap(category => {
        if (!category) {
          return throwError(() => new NotFoundException(`Category with Id ${categoryId} not found`));
        }
        const newProduct = this.productsRepository.create({
          ...productData,
          category,
           userId
        });
        return from(this.productsRepository.save(newProduct));
      })
    );
   
  }

  findAll(userId:number): Observable<PostProductDto[]> {
    return from(this.productsRepository.find({ where: { userId } })).pipe(
      map(products => {
        if (products.length === 0) {
          throw new NotFoundException(`Products for this user do not exist yet`);
        }
        return products
      })
    );
   
    
  }

  findOne(id: number,userId : number): Observable<PostProductDto> {
    return from(this.productsRepository.findOne({ where: { id,userId } })).pipe(map(product=>{
      if(!product){
        throw new NotFoundException(`Product with ID ${id} does not belong to the logged user `)
      }
      return product
    }));
  }
  findOneByCategory(categoryId:number,userId:number):Observable<CreateProductDto[]>{
    return from(this.categoriesService.findOne(categoryId)).pipe(mergeMap(category=>{
      if(!category){
        return throwError(()=>new NotFoundException(`Category with ID ${categoryId} not found`) )

      }
      return from(this.productsRepository.find({where:{categoryId,userId}}))
    }))
  }

  update(
    id: number,
    updateProductDto: UpdateProductDto,
    userId:number
  ): Observable<UpdateResult> {
    return from(this.productsRepository.update({id,userId}, updateProductDto)).pipe(
      mergeMap(updateResult =>{
        if(updateResult.affected ===0){
          return throwError(()=>new NotFoundException(`Product with ${id} does not belong to the logged user`))
        }
        return of(updateResult)
      })
    );
  }

  remove(id: number,userId : number): Observable<DeleteResult> {
    return from(this.productsRepository.delete(id)).pipe(
      mergeMap(deleteResult =>{
        if(deleteResult.affected===0){
          return throwError(()=>new NotFoundException(`Product with ${id} does not belong to the logged user`))
        }
        return of(deleteResult)
      })
    )
  }
}
