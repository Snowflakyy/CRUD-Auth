import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    // @IsEmpty()
    // id?:number;

    @IsString()
    @IsOptional()
    name:string;

    @IsString()
    @IsOptional()
    description:string;
}
