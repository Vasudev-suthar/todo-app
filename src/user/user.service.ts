import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Constants } from 'src/utils/constants';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userRepository : Repository<User>){

  }

  create(createUserDto: CreateUserDto) {
    let user: User = new User()
    user.email = createUserDto.email;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.password = createUserDto.password;
    user.role = Constants.ROLES.NORMAL_ROLE;
    return this.userRepository.save(user);
  }

  findUserById(id:number){
    return this.userRepository.findOne({where: {id : id}})
  }

  findAll() {
    return this.userRepository.find();
  }

  findUserByEmail(email:string){
    return this.userRepository.findOne({where: {email: email}});
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
