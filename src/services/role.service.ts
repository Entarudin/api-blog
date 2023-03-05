import { Inject, Injectable } from '@nestjs/common';
import { RepositoriesProviderEnum } from '../enums/repositories-provider.enum';
import { UpdateRoleDto, CreateRoleDto } from '../dtos/role-dto';
import { RoleModel } from '../models/roleModel';
import { IRoleRepository } from '../repositories/interfaces/role-repository.interface';
import {
  RoleAlreadyExistByNameExeption,
  RoleByIdNotFoundExeption,
} from 'src/exeptions/role-exeptions';

@Injectable()
export class RoleService {
  constructor(
    @Inject(RepositoriesProviderEnum.RoleRepository)
    private readonly roleRepository: IRoleRepository,
  ) {}

  public async create(dto: CreateRoleDto): Promise<RoleModel> {
    await this.checkExistRoleByName(dto.name);
    const role = await this.roleRepository.create(dto);
    return role;
  }

  public async update(id: string, dto: UpdateRoleDto): Promise<RoleModel> {
    await this.checkExistRoleById(id);
    const updatedRole = await this.roleRepository.update(id, dto);
    return updatedRole;
  }

  public async findByName(name: string): Promise<RoleModel> {
    const role = await this.roleRepository.findByName(name);
    return role;
  }

  public async delete(id: string): Promise<void> {
    await this.checkExistRoleById(id);
    await this.roleRepository.delete(id);
  }

  public async findAll(): Promise<RoleModel[]> {
    const roles = await this.roleRepository.findAll();
    return roles;
  }

  private async checkExistRoleById(id: string): Promise<RoleModel> {
    const existsRole = await this.roleRepository.findById(id);
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
