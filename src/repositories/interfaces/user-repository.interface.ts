import { UpdateUserDto, CreateUserDto } from 'src/dtos/user-dto';
import { UserModel } from '../../models/userModel';
import { IFindUserOptions } from 'src/options/find-user.options.interface';
import { RoleModel } from 'src/models/roleModel';

export interface IUserRepository {
  create(dto: CreateUserDto, role: RoleModel): Promise<UserModel>;
  update(id: string, dto: UpdateUserDto): Promise<UserModel>;
  delete(id: string): Promise<void>;
  findAll(): Promise<UserModel[]>;
  findById(id: string): Promise<UserModel>;
  findByEmail(email: string): Promise<UserModel | undefined>;
  findByOptions(options: IFindUserOptions): Promise<UserModel[]>;
}
