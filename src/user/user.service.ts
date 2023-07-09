import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(newUser);
  }

  async findAll(): Promise<Omit<User, 'hashedRt'>[]> {
    const users = await this.usersRepository.find();

    return users.map((user) => {
      const { hashedRt, ...userWithoutHashedRt } = user;
      return userWithoutHashedRt;
    });
  }

  async findOne(id: User['id']): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: User['id'], updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: ['id', 'login', 'password', 'createdAt', 'updatedAt', 'hashedRt'],
    });

    if (!user) throw new NotFoundException('User not found');

    if (user.password !== updateUserDto.oldPassword)
      throw new ForbiddenException('Invalid old password');

    user.password = updateUserDto.newPassword;

    await this.usersRepository.save(user);

    delete user.password;
    delete user.hashedRt;

    return user;
  }

  async remove(id: User['id']) {
    const result = await this.usersRepository.delete(id);

    if (result.affected === 0) throw new NotFoundException('User not found');
  }
}
