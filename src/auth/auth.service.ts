import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { TokensService } from '../tokens/tokens.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private tokenService: TokensService,
  ) {}

  async register(registerDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(registerDto.email);
    if (candidate) {
      throw new HttpException(
        'User with this email is already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await this.hashData(registerDto.password);

    const user = await this.userService.create({
      ...registerDto,
      password: hashPassword,
    });
    const tokens = await this.tokenService.generateTokens(user);
    await this.tokenService.saveRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async login(loginDto: LoginAuthDto) {
    const user = await this.userService.getUserByEmail(loginDto.email);

    if (!user) {
      throwError();
    }

    const passportMatches = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!passportMatches) {
      throwError();
    }

    const tokens = await this.tokenService.generateTokens(user);
    await this.tokenService.saveRefreshToken(user.id, tokens.refreshToken);
    return tokens;

    function throwError() {
      throw new HttpException(
        'Wrong email or password',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  logout(userId: number) {
    this.tokenService.deleteTokenByUserId(userId);
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.userService.getUserById(userId);
    if (!user) throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = refreshToken === user.token.refreshToken;
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.tokenService.generateTokens(user);
    await this.tokenService.saveRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }
}
