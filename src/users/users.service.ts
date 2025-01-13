import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { from, Observable } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private readonly usersRepository : Repository<UserEntity>
  ){}
  create(createUserDto: CreateUserDto) : Observable<CreateUserDto> {
    return from(this.usersRepository.save(createUserDto))
  }

  findAll() : Observable<CreateUserDto[]> {
    return from(this.usersRepository.find());
  }

  findOne(userId: number): Observable<CreateUserDto>  {
    return from(this.usersRepository.findOne({where:{userId}}));
  }

  update(userId: number, updateUserDto: UpdateUserDto) : Observable<UpdateResult> {
    return from(this.usersRepository.update(userId,updateUserDto))
  }

  remove(userId: number) : Observable<DeleteResult> {
    return from(this.usersRepository.delete(userId))
  }
}
