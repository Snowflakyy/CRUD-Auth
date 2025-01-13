import { IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {

   @IsEmpty()
    id?:number;

    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsNotEmpty()
    description:string;
}
