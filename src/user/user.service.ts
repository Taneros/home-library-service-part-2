import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private db: DatabaseService) {}

  create(createUserDto: CreateUserDto) {
    return this.db.createUser(createUserDto);
  }

  findAll() {
    return this.db.findAllUsers();
  }

  findOne(id: string) {
    const userById = this.db.findOneUser(id);
    if (userById) return userById;
    throw new NotFoundException('User not found');
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const userById = this.db.findOneUser(id);
    if (!userById) throw new NotFoundException('User not found');

    if (userById.password !== updateUserDto.oldPassword)
      throw new ForbiddenException('Invalid old password');

    const updatedUser = this.db.updateUser(id, {
      password: updateUserDto.newPassword,
    });

    return updatedUser;
  }

  remove(id: string) {
    const deletedUser = this.db.deleteUser(id);
    if (!deletedUser) {
      throw new NotFoundException('User not found');
    } else {
      return deletedUser;
    }
  }
}
