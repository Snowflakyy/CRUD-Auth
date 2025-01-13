import { IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsEmpty()
    userId:number;

    @IsNotEmpty()
    @IsString()
    email:string;

    @IsNotEmpty()
    @IsString()
    password:string;
}
