import { Injectable } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { Token } from './entities/token.entity';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as process from 'process';
import { TokensEntity } from './entities/tokens.entity';

@Injectable()
export class TokensService {
  constructor(
    @InjectModel(Token)
    private tokenRepository: typeof Token,
    private jwtService: JwtService,
  ) {}

  validateRefreshToken(userId: number, token: string) {
    const secret = process.env.REFRESH_SECRET;
  }

  async generateTokens(user: User): Promise<TokensEntity> {
    const payload = {
      userId: user.id,
      email: user.email,
      roles: user.roles,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.ACCESS_SECRET,
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_SECRET,
      expiresIn: '24h',
    });

    return { accessToken, refreshToken };
  }

  async saveRefreshToken(userId: number, refreshToken: string) {
    // todo maybe i have to hash token
    const token = await this.tokenRepository.findOne({ where: { userId } });
    if (token) {
      await this.tokenRepository.update(
        { refreshToken },
        { where: { userId } },
      );
    } else {
      await this.tokenRepository.create({ userId, refreshToken });
    }
  }

  async deleteTokenByUserId(userId: number) {
    await this.tokenRepository.destroy({ where: { userId } });
  }

  create(createTokenDto: CreateTokenDto) {
    return 'This action adds a new token';
  }

  findAll() {
    return `This action returns all tokens`;
  }

  findOne(id: number) {
    return `This action returns a #${id} token`;
  }

  update(id: number, updateTokenDto: UpdateTokenDto) {
    return `This action updates a #${id} token`;
  }

  remove(id: number) {
    return `This action removes a #${id} token`;
  }
}
