import { InjectModel } from 'nestjs-typegoose';
import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { IRoleRepository } from './interfaces/role-repository.interface';
import { RoleModel } from 'src/models/roleModel';

@Injectable()
export class RoleRepository implements IRoleRepository {
  constructor(
    @InjectModel(RoleModel)
    private readonly repository: ModelType<RoleModel>,
  ) {}

  public async create(name: string): Promise<RoleModel> {
    return this.repository.create({ name });
  }

  public async update(id: string, name: string): Promise<RoleModel> {
    return this.repository
      .findByIdAndUpdate(id, { name }, { new: true })
      .exec();
  }

  public async delete(id: string): Promise<void> {
    await this.repository.findByIdAndDelete(id).exec();
  }

  public async findAll(): Promise<RoleModel[]> {
    return this.repository.find({}).exec();
  }

  public async findByName(name: string): Promise<RoleModel> {
    return this.repository.findOne({ name }).exec();
  }
}
