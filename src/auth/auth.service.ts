import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signup(user: AuthDto): Promise<Tokens> {
    console.log(`auth.service.ts - line: 24 ->> signup`);
    const hash = await this.hashData(user.password);
    const newUser = this.usersRepository.create({
      login: user.email,
      password: hash,
    });

    const tokens = await this.getTokens(newUser.id, newUser.login);
    // why make hash of rt token?
    newUser.hashedRt = await this.hashData(tokens.refresh_token);

    await this.usersRepository.save(newUser);

    return tokens;
  }

  async login(user: AuthDto): Promise<Tokens> {
    const findUser = await this.usersRepository.findOne({
      where: { login: user.email },
      select: ['id', 'login', 'password', 'createdAt', 'updatedAt', 'hashedRt'],
    });
    if (!findUser) throw new NotFoundException('User not found');

    const matchPassword = await bcrypt.compare(
      user.password,
      findUser.password,
    );

    if (!matchPassword)
      throw new UnauthorizedException('Invalid username or password');

    const tokens = await this.getTokens(findUser.id, findUser.login);

    findUser.hashedRt = await this.hashData(tokens.refresh_token);

    await this.usersRepository.save(findUser);

    return tokens;
  }

  async logout(id: User['id']) {
    const findUser = await this.usersRepository.findOne({
      where: { id },
      select: ['id', 'login', 'password', 'createdAt', 'updatedAt', 'hashedRt'],
    });
    if (!findUser) throw new NotFoundException('User not found');

    findUser.hashedRt = null;

    await this.usersRepository.save(findUser);

    return '';
  }

  async refresh(id: User['id'], rt: string) {
    const findUser = await this.usersRepository.findOne({
      where: { id },
      select: ['id', 'login', 'password', 'createdAt', 'updatedAt', 'hashedRt'],
    });
    if (!findUser) throw new NotFoundException('User not found');

    if (!findUser.hashedRt) throw new UnauthorizedException('Not authorized');

    const isRtMatch = await bcrypt.compare(rt, findUser.hashedRt);
    if (!isRtMatch) throw new UnauthorizedException('Not authorized');

    const tokens = await this.getTokens(findUser.id, findUser.login);
    // why make hash of rt token?
    findUser.hashedRt = await this.hashData(tokens.refresh_token);

    await this.usersRepository.save(findUser);

    return tokens;
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId, // TODO remove sub use id
          email,
        },
        {
          secret: 'at-secret',
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'rt-secret',
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async updateRtHash(userId: User['id'], rt: string) {
    const hash = await this.hashData(rt);

    const user = await this.usersRepository.findOne({
      where: { id: userId },
      select: ['id', 'login', 'password', 'createdAt', 'updatedAt'],
    });
    if (!user) throw new NotFoundException('User not found');

    user.hashedRt = hash;

    await this.usersRepository.save(user);
  }
}
