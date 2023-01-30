import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateRoleDto, CreateRoleDto } from '../dtos/role-dto';
import { RoleModel } from '../models/roleModel';
import { RoleService } from '../services/role.service';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private roleService: RoleService) {}

  @Get('/')
  async findAll(): Promise<RoleModel[]> {
    const roles = await this.roleService.findAll();
    return roles;
  }

  @Post('/')
  async create(@Body() dto: CreateRoleDto): Promise<RoleModel> {
    const role = await this.roleService.create(dto);
    return role;
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateRoleDto,
  ): Promise<RoleModel> {
    const role = await this.roleService.update(id, dto);
    return role;
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.roleService.delete(id);
  }
}
