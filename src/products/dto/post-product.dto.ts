import { IsNotEmpty, IsNumber } from "class-validator";
import { CreateProductDto } from "./create-product.dto";

export class PostProductDto extends CreateProductDto{
    @IsNotEmpty()
    @IsNumber()
    userId:number;
}