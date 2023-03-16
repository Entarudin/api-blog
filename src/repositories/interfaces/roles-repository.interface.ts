import { RoleModel } from '../../models/roleModel';
import { CreateRoleDto, UpdateRoleDto } from 'src/dtos/role-dto';
import { IBaseCRUDRepository } from './base-crud-repository.interface';

export interface IRolesRepository
  extends IBaseCRUDRepository<RoleModel, CreateRoleDto, UpdateRoleDto> {
  findByName(name: string): Promise<RoleModel | undefined>;
}
