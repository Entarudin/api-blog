import { InjectModel } from 'nestjs-typegoose';
import { Injectable } from '@nestjs/common';

import { IRolesRepository } from './interfaces/roles-repository.interface';
import { RoleModel } from 'src/models/roleModel';
import { CreateRoleDto, UpdateRoleDto } from 'src/dtos/role-dto';
import { MongoGenericRepository } from './mongo-generic.repository';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class RolesRepository
  extends MongoGenericRepository<RoleModel, CreateRoleDto, UpdateRoleDto>
  implements IRolesRepository
{
  constructor(
    @InjectModel(RoleModel)
    private readonly roleModel: ReturnModelType<typeof RoleModel>,
  ) {
    super(roleModel);
  }

  public async findByName(name: string): Promise<RoleModel> {
    return this.roleModel.findOne({ name }).exec();
  }
}
