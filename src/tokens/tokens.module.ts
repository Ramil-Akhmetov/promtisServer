import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { User } from '../users/entities/user.entity';
import { Token } from './entities/token.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({}), SequelizeModule.forFeature([Token, User])],
  controllers: [],
  providers: [TokensService],
  exports: [TokensService],
})
export class TokensModule {}
