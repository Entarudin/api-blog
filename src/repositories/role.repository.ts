import { InjectModel } from 'nestjs-typegoose';
import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';

import { IRoleRepository } from './interfaces/role-repository.interface';
import { RoleModel } from 'src/models/roleModel';
import { CreateRoleDto, UpdateRoleDto } from 'src/dtos/role-dto';

@Injectable()
export class RoleRepository implements IRoleRepository {
  constructor(
    @InjectModel(RoleModel)
    private readonly repository: ModelType<RoleModel>,
  ) {}

  public async create(dto: CreateRoleDto): Promise<RoleModel> {
    return this.repository.create(dto);
  }

  public async update(id: string, dto: UpdateRoleDto): Promise<RoleModel> {
    return this.repository.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  public async findById(id: string): Promise<RoleModel> {
    return this.repository.findById(id).exec();
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
