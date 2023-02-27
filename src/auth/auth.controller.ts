import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Response } from 'express';
import { JwtPayloadWithRt } from './strategies/types';
import { RtGuard } from '../common/guards/rt.guard';
import { GetCurrentUser } from '../common/decorators/get-current-user.decorator';
import { Public } from '../common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async signupLocal(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.register(
      createUserDto,
    );

    this.setUpRefreshTokenToCookies(res, refreshToken);
    return { accessToken };
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async signinLocal(
    @Body() loginAuthDto: LoginAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.login(
      loginAuthDto,
    );

    this.setUpRefreshTokenToCookies(res, refreshToken);
    return { accessToken };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(
    @GetCurrentUser('userId') userId: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.authService.logout(userId);
    res.clearCookie('refreshToken');
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrentUser() payload: JwtPayloadWithRt,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log('payload: ' + payload.refreshToken);
    const { accessToken, refreshToken } = await this.authService.refreshTokens(
      payload.userId,
      payload.refreshToken,
    );

    this.setUpRefreshTokenToCookies(res, refreshToken);
    return { accessToken };
  }

  setUpRefreshTokenToCookies(res: Response, refreshToken: string) {
    res.cookie('refreshToken', refreshToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
  }
}
