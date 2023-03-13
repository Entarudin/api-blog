import { InjectModel } from 'nestjs-typegoose';
import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';

import { CreateCommentDto, UpdateCommentDto } from 'src/dtos/comment-dto';
import { CommentModel } from 'src/models/commentModel';
import { ICommentRepository } from './interfaces/comment-repository.interface';

@Injectable()
export class CommentRepository implements ICommentRepository {
  constructor(
    @InjectModel(CommentModel)
    private readonly repository: ModelType<CommentModel>,
  ) {}

  public async create(dto: CreateCommentDto): Promise<CommentModel> {
    return this.repository.create(dto);
  }

  public async update(
    id: string,
    dto: UpdateCommentDto,
  ): Promise<CommentModel> {
    return this.repository.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  public async delete(id: string): Promise<void> {
    await this.repository.findByIdAndDelete(id).exec();
  }

  public async findAll(): Promise<CommentModel[]> {
    return this.repository.find({}).exec();
  }

  public async findById(id: string): Promise<CommentModel> {
    return this.repository.findById(id).exec();
  }
}
