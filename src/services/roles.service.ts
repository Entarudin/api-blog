import { Inject, Injectable } from '@nestjs/common';
import { RepositoriesProviderEnum } from '../enums/repositories-provider.enum';
import { UpdateRoleDto, CreateRoleDto } from '../dtos/role-dto';
import { RoleModel } from '../models/roleModel';
import { IRolesRepository } from '../repositories/interfaces/roles-repository.interface';
import {
  RoleAlreadyExistByNameExeption,
  RoleByIdNotFoundExeption,
} from 'src/exeptions/role-exeptions';

@Injectable()
export class RolesService {
  constructor(
    @Inject(RepositoriesProviderEnum.RolesRepository)
    private readonly rolesRepository: IRolesRepository,
  ) {}

  public async create(dto: CreateRoleDto): Promise<RoleModel> {
    await this.checkExistRoleByName(dto.name);
    const role = await this.rolesRepository.create(dto);
    return role;
  }

  public async update(id: string, dto: UpdateRoleDto): Promise<RoleModel> {
    await this.checkExistRoleById(id);
    const updatedRole = await this.rolesRepository.update(id, dto);
    return updatedRole;
  }

  public async findByName(name: string): Promise<RoleModel> {
    const role = await this.rolesRepository.findByName(name);
    return role;
  }

  public async delete(id: string): Promise<void> {
    await this.checkExistRoleById(id);
    await this.rolesRepository.delete(id);
  }

  public async findAll(): Promise<RoleModel[]> {
    const roles = await this.rolesRepository.findAll();
    return roles;
  }

  private async checkExistRoleById(id: string): Promise<RoleModel> {
    const existsRole = await this.rolesRepository.findById(id);
    if (!existsRole) {
      throw new RoleByIdNotFoundExeption(id);
    }
    return existsRole;
  }

  private async checkExistRoleByName(name: string): Promise<RoleModel> {
    const existsRole = await this.findByName(name);
    if (existsRole) {
      throw new RoleAlreadyExistByNameExeption();
    }
    return existsRole;
  }
}
