import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Permission } from './entities/permission.entity';
import { Role } from '../roles/entities/role.entity';
import { RolesPermissions } from '../roles/entities/role-permission.entity';

@Module({
  imports: [SequelizeModule.forFeature([Permission, Role, RolesPermissions])],
  controllers: [PermissionsController],
  providers: [PermissionsService],
})
export class PermissionsModule {}
