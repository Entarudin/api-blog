import { UpdateUserDto, CreateUserDto, FindUsersDto } from 'src/dtos/user-dto';
import { UserModel } from '../../models/userModel';
import { RoleModel } from 'src/models/roleModel';
import { IBaseCRUDRepository } from './base-crud-repository.interface';

export interface IUsersRepository
  extends Omit<
    IBaseCRUDRepository<UserModel, CreateUserDto, UpdateUserDto>,
    'create'
  > {
  create(dto: CreateUserDto, role: RoleModel): Promise<UserModel>;
  findByEmail(email: string): Promise<UserModel | undefined>;
  findByOptions(dto: FindUsersDto): Promise<UserModel[]>;
}
