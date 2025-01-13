import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from "passport-local"
import { AuthService } from "../auth.service";
import { firstValueFrom } from "rxjs";
import { AuthPayloadDto } from "../dto/auth.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService: AuthService) {
        super({
          usernameField: 'email',
          passwordField: 'password',
        });
      }
    
      async validate(email: string, password: string): Promise<{ access_token: string }> {
        try {
          const user = await firstValueFrom(this.authService.validateUser({ email, password }));
          console.log("User validated successfully");
          return user;
        } catch (error) {
          console.error("Authentication failed:", error.message);
          throw new UnauthorizedException(error.message);
        }
      }
}