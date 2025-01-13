import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ConsoleLogger } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';
import { RequestUserDto } from 'src/auth/dto/req.auth.dto';
import { PostProductDto } from './dto/post-product.dto';
import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Req() req: Request,@Body() createProductDto: CreateProductDto) :Observable<PostProductDto> {

    const {userId,...userInfo} = req.user as RequestUserDto
    console.log(userId)
    return this.productsService.create(userId,createProductDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req: Request) : Observable<PostProductDto[]> {
    const {userId,...userInfo} = req.user as RequestUserDto
    return this.productsService.findAll(userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Req() req: Request,@Param('id') id: number) : Observable<PostProductDto> {
    const {userId,...userInfo} = req.user as RequestUserDto
    return this.productsService.findOne(id,userId);
  }
@Get('byCategory/:category_id')
@UseGuards(JwtAuthGuard)
findOneByCategory(@Req() req: Request,@Param('category_id') id: number) : Observable<CreateProductDto[]>{
    const {userId,...userInfo} = req.user as RequestUserDto
    return this.productsService.findOneByCategory(id,userId)
}
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Req() req: Request,@Param('id') id: number, @Body() updateProductDto: UpdateProductDto): Observable<UpdateResult> {
    const {userId} = req.user as RequestUserDto
    return this.productsService.update(id, updateProductDto,userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Req() req: Request,@Param('id') id: number): Observable<DeleteResult> {
    const {userId} = req.user as RequestUserDto
    return this.productsService.remove(id,userId);
  }
}
