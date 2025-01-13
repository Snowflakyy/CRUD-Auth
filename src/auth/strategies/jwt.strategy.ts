import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { RequestUserDto } from "../dto/req.auth.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration : false,
            secretOrKey:'b591fa36dc0ec77fca74614334757cf114ab430cd9266f25bf5ec41888881dc507b6accc72cc3ca50c5e33bd59a85dbb69f8dc86f6d43ecdae0e61c2034cd72a346ae3612f1e9ed52cf76e0da47e998a680c837e025652a0cea4a504751510fa78e90737673b0be0ed7111da901fa0272b279335ea89554299273e2a542849968621f9461a3a34f7146a3a99bfb408177843d4467b0b00bafb1c375a34792b4d545e6bfee4a82a8f54c4d89c6e688e4dbcbdb7187a0d14906f73030aecb1a264f0075a6a7f7b3cbe68e5c83b1fc96e119993ba2f3e067bd64d06a9083bf6a0b5eb4dd9ca69a456c05598600363721466b64b1e01261bd4206e6d5ddd03c773df'


        })
    }
    validate(payload : RequestUserDto){
        console.log("The user inside strategy validate")
        console.log(payload)
        return payload;
    }
}