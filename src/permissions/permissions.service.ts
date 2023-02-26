import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission)
    private permissionRepository: typeof Permission,
  ) {}

  create(createPermissionDto: CreatePermissionDto) {
    const role = this.permissionRepository.findOne({
      where: { name: createPermissionDto.name },
    });
    if (role) {
      throw new HttpException(
        'Permission with this name is already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.permissionRepository.create(createPermissionDto);
  }

  findAll() {
    return `This action returns all permissions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
