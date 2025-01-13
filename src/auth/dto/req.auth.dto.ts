import { IsNumber, IsString } from "class-validator";

export class RequestUserDto{
   
    @IsNumber()
    userId:number;

    @IsString()
    email:string;

    @IsNumber()
    iat:number;

    @IsNumber()
    exp:number;
}