import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './entities/role.entity';
import { Permission } from '../permissions/entities/permission.entity';
import { RolesPermissions } from './entities/role-permission.entity';
import { User } from '../users/entities/user.entity';
import { UsersRoles } from './entities/users-roles.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Role,
      Permission,
      RolesPermissions,
      User,
      UsersRoles,
    ]),
  ],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
