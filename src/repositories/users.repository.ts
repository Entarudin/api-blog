import { InjectModel } from 'nestjs-typegoose';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';

import { CreateUserDto, FindUsersDto, UpdateUserDto } from 'src/dtos/user-dto';
import { UserModel } from 'src/models/userModel';
import { IUsersRepository } from './interfaces/users-repository.interface';
import { RoleModel } from 'src/models/roleModel';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectModel(UserModel)
    private readonly repository: ModelType<UserModel>,
  ) {}

  public async create(dto: CreateUserDto, role: RoleModel): Promise<UserModel> {
    return this.repository.create({ ...dto, roles: role });
  }

  public async update(id: string, dto: UpdateUserDto): Promise<UserModel> {
    return this.repository.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  public async delete(id: string): Promise<void> {
    await this.repository.findByIdAndDelete(id).exec();
  }

  public async findAll(): Promise<UserModel[]> {
    return this.repository.find({}).exec();
  }

  public async findById(id: string): Promise<UserModel> {
    return await this.repository.findById(id);
  }

  public async findByEmail(email: string): Promise<UserModel> {
    return this.repository.findOne({ email }).exec();
  }

  public async findByOptions(dto: FindUsersDto): Promise<UserModel[]> {
    const {} = dto;
    throw new NotImplementedException();
  }
}
