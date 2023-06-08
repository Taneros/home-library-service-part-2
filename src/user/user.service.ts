import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DatabaseService } from 'src/database/database.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private db: DatabaseService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }

  //OLD
  // create(createUserDto: CreateUserDto) {
  //   return this.db.createUser(createUserDto);
  // }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  //OLD
  // findAll() {
  //   return this.db.findAllUsers();
  // }

  

  //OLD
  // findOne(id: string) {
  //   const userById = this.db.findOneUser(id);
  //   if (userById) return userById;
  //   throw new NotFoundException('User not found');
  // }

  // update(id: string, updateUserDto: UpdateUserDto) {
  //   const userById = this.db.findOneUser(id);
  //   if (!userById) throw new NotFoundException('User not found');

  //   if (userById.password !== updateUserDto.oldPassword)
  //     throw new ForbiddenException('Invalid old password');

  //   const updatedUser = this.db.updateUser(id, {
  //     password: updateUserDto.newPassword,
  //   });

  //   return updatedUser;
  // }

  // remove(id: string) {
  //   const deletedUser = this.db.deleteUser(id);
  //   if (!deletedUser) {
  //     throw new NotFoundException('User not found');
  //   } else {
  //     return deletedUser;
  //   }
  // }
}
