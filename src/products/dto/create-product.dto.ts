import { IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateProductDto {
  
    @IsEmpty()
    id?:number;

    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsOptional()
    description?:string;

    @IsNumber()
    @IsNotEmpty()
    price:number;

    @IsNumber()
    @IsNotEmpty()
    stock:number;

    @IsNumber()
    categoryId:number;

 
    
}
