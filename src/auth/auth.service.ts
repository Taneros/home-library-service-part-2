import { Injectable } from '@nestjs/common';
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

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
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

  async updateHash(userId: User['id'], rt: string) {
    const hash = await this.hashData(rt);

    const user = await this.usersRepository.findOne({
      where: { id: userId },
      select: ['id', 'login', 'password', 'createdAt', 'updatedAt'],
    });
  }

  login() {
    return '';
  }

  logout() {
    return '';
  }

  async signup(user: AuthDto): Promise<Tokens> {
    const hash = await this.hashData(user.password);
    const newUser = this.usersRepository.create({
      login: user.email,
      password: hash,
    });

    const savedUser = await this.usersRepository.save(newUser);

    const tokens = await this.getTokens(savedUser.id, newUser.login);

    return tokens;
  }

  refresh() {
    return '';
  }
}
