import { Module } from '@nestjs/common';
import { RolesModule } from './roles/roles.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './roles/entities/role.entity';
import { PermissionsModule } from './permissions/permissions.module';
import { UsersModule } from './users/users.module';
import { Permission } from './permissions/entities/permission.entity';
import { RolesPermissions } from './roles/entities/role-permission.entity';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import { Dialect } from 'sequelize/types/sequelize';
import { AuthModule } from './auth/auth.module';
import { TokensModule } from './tokens/tokens.module';
import { Token } from './tokens/entities/token.entity';
import { UsersRoles } from './roles/entities/users-roles.entity';
import { User } from './users/entities/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards/at.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: process.env.DB_DIALECT as Dialect,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      models: [Role, Permission, RolesPermissions, Token, User, UsersRoles],
      autoLoadModels: true,
    }),
    RolesModule,
    PermissionsModule,
    UsersModule,
    AuthModule,
    TokensModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
