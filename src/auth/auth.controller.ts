import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetCurrentUser, GetCurrentUserId, Public } from './common/decorators';
import { RtGuard } from './common/guards';
import { AuthDto } from './dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() dto: AuthDto): Promise<Tokens> {
    console.log(`auth.controller.ts - line: 27 ->> signup`);
    return this.authService.signup(dto);
  }

  @Public()
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.login(dto);
  }

  // @UseGuards(AuthGuard('jwt'))
  // @Post('/logout')
  // @HttpCode(HttpStatus.OK)
  // logout(@Req() req: Request) {
  //   const user = req.user;
  //   this.authService.logout(user.sub);
  // }

  // @UseGuards(AtGuard)
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  // logout(@UserId() user: any) {
  logout(@GetCurrentUserId() userId: string) {
    return this.authService.logout(userId);
  }

  // @UseGuards(AuthGuard('jwt-refresh'))
  // @Post('/refresh')
  // @HttpCode(HttpStatus.OK)
  // refresh(@Req() req: Request) {
  //   const user = req.user;
  //   this.authService.refresh(user.sub, user.refreshToken);
  // }

  @Public()
  @UseGuards(RtGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  refresh(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refresh(userId, refreshToken);
  }
}
