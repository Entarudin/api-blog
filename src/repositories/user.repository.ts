import { InjectModel } from 'nestjs-typegoose';
import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CreateUserDto, UpdateUserDto } from 'src/dtos/user-dto';
import { UserModel } from 'src/models/userModel';
import { IFindUserOptions } from 'src/options/find-user.options.interface';
import { IUserRepository } from './interfaces/user-repository.interface';
import { RoleModel } from 'src/models/roleModel';

@Injectable()
export class UserRepository implements IUserRepository {
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

  public async findByOptions(options: IFindUserOptions): Promise<UserModel[]> {
    const {} = options;
    throw new Error('Method not implemented.');
  }
}
