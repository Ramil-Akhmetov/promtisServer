import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { TokensService } from '../tokens/tokens.service';
import { AtStrategy } from './strategies/at.strategy';
import { RtStrategy } from './strategies/rt.strategy';
import { SequelizeModule } from '@nestjs/sequelize';
import { Token } from '../tokens/entities/token.entity';
import { User } from '../users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({}), SequelizeModule.forFeature([Token, User])],
  controllers: [AuthController],
  providers: [AuthService, UsersService, TokensService, AtStrategy, RtStrategy],
})
export class AuthModule {}
