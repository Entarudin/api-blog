import { IBaseCRUDRepository } from './interfaces/base-crud-repository.interface';
import { ReturnModelType } from '@typegoose/typegoose';
import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';

export abstract class MongoGenericRepository<TModel, TCreateDto, TUpdateDto>
  implements IBaseCRUDRepository<TModel, TCreateDto, TUpdateDto>
{
  protected model: ReturnModelType<AnyParamConstructor<TModel>>;

  protected constructor(model: ReturnModelType<AnyParamConstructor<TModel>>) {
    this.model = model;
  }

  public async create(createEntityData: unknown): Promise<TModel> {
    return this.model.create(createEntityData);
  }

  public async update(id: string, dto: TUpdateDto): Promise<TModel> {
    return this.model.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  public async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }

  public async findAll(): Promise<TModel[]> {
    return this.model.find({}).exec();
  }

  public async findById(id: string): Promise<TModel> {
    return this.model.findById(id).exec();
  }
}
