import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/repositories/interfaces/user-repository.interface';
import { RoleService } from './role.service';
import { BcryptService } from './bcrypt.service';
import { UserModel } from 'src/models/userModel';
import { CreateUserDto, UpdateUserDto } from 'src/dtos/user-dto';
import { RoleByNameNotFoundExeption } from 'src/exeptions/role-exeptions';
import { UserByIdNotFoundExeption } from 'src/exeptions/user-exeptions';
import { RepositoriesProviderEnum } from '../enums/repositories-provider.enum';
import { RoleModel } from 'src/models/roleModel';

@Injectable()
export class UserService {
  constructor(
    @Inject(RepositoriesProviderEnum.UserRepository)
    private readonly userRepository: IUserRepository,
    private readonly roleService: RoleService,
    private readonly bcryptService: BcryptService,
  ) {}

  public async create(dto: CreateUserDto): Promise<UserModel> {
    const role = await this.checkRoleExistByName(dto.role);
    const passwordHash = await this.generatePasswordHash(dto.passwordHash);
    const user = await this.userRepository.create(
      {
        ...dto,
        passwordHash: passwordHash,
      },
      role,
    );
    return user;
  }

  public async findById(id: string): Promise<UserModel> {
    const user = await this.userRepository.findById(id);
    return user;
  }

  public async findAll(): Promise<UserModel[]> {
    const users = await this.userRepository.findAll();
    return users;
  }

  public async delete(id: string): Promise<void> {
    await this.checkUserExistById(id);
    await this.userRepository.delete(id);
  }

  public async getUserByEmail(email: string): Promise<UserModel | undefined> {
    const user = await this.userRepository.findByEmail(email);
    return user;
  }

  public async update(id: string, dto: UpdateUserDto): Promise<UserModel> {
    await this.checkUserExistById(id);
    const updatedUser = await this.userRepository.update(id, dto);
    return updatedUser;
  }

  private async checkUserExistById(id: string): Promise<UserModel> {
    const existUser = await this.findById(id);
    if (!existUser) {
      throw new UserByIdNotFoundExeption(id);
    }
    return existUser;
  }

  private async checkRoleExistByName(roleName: string): Promise<RoleModel> {
    const existsRole = await this.roleService.findByName(roleName);
    if (!existsRole) {
      throw new RoleByNameNotFoundExeption(roleName);
    }
    return existsRole;
  }

  private async generatePasswordHash(password: string): Promise<string> {
    const passwordHash = await this.bcryptService.generateHash(password);
    return passwordHash;
  }
}
