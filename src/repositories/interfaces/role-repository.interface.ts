import { RoleModel } from '../../models/roleModel';

export interface IRoleRepository {
  create(name: string): Promise<RoleModel>;
  update(id: string, name: string): Promise<RoleModel>;
  delete(id: string): Promise<void>;
  findAll(): Promise<RoleModel[]>;
  findByName(name: string): Promise<RoleModel | undefined>;
  findById(id: string): Promise<RoleModel | undefined>;
}
