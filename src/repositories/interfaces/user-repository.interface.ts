import { UpdateUserDto, CreateUserDto } from 'src/dtos/user-dto';
import { UserModel } from '../../models/userModel';
import { IFindUserOptions } from 'src/options/find-user.options.interface';
import { RoleModel } from 'src/models/roleModel';
import { IBaseCRUDRepository } from './base-crud-repository.interface';

export interface IUserRepository
  extends Omit<
    IBaseCRUDRepository<UserModel, CreateUserDto, UpdateUserDto>,
    'create'
  > {
  create(dto: CreateUserDto, role: RoleModel): Promise<UserModel>;
  findByEmail(email: string): Promise<UserModel | undefined>;
  findByOptions(options: IFindUserOptions): Promise<UserModel[]>;
}
