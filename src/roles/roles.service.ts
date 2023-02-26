import { Role } from './entities/role.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role)
    private rolesRepository: typeof Role,
  ) {}

  create(createRoleDto: CreateRoleDto) {
    const role = this.rolesRepository.findOne({
      where: { name: createRoleDto.name },
    });
    if (role) {
      throw new HttpException(
        'Role with this name is already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.rolesRepository.create(createRoleDto);
  }

  findAll() {
    return `This action returns all roles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
