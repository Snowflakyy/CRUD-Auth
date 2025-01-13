import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { catchError, from, mergeMap, Observable, of, throwError } from 'rxjs';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(UserEntity) private readonly usersRepository:Repository<UserEntity>,
private jwtService : JwtService){}

validateUser(authPayload: AuthPayloadDto): Observable<{ access_token: string }> {
  return from(this.usersRepository.findOne({ where: { email: authPayload.email } })).pipe(
    mergeMap(user => {
      if (!user) {
        return throwError(() => new NotFoundException('User not found'));
      }
      if(authPayload.password=== user.password){

        return of(this.generateToken(user))
      }
    }),
  );
}

private generateToken(user: UserEntity): { access_token: string } {
  const {password, ...userInfo} = user
  return {
    access_token: this.jwtService.sign(userInfo),
  };
}
}
