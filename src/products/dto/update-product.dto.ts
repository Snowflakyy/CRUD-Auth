import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {

    // @IsEmpty()
    // @IsNumber()
    // id?:number;

    @IsString()
    @IsOptional()
    name:string;

    @IsString()
    @IsOptional()
    description:string;

    @IsNumber()
    @IsOptional()
    price:number;

    @IsNumber()
    @IsOptional()
    stock:number;
}
