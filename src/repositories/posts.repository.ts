import { InjectModel } from 'nestjs-typegoose';
import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';

import { CreatePostDto, FindPostsDto, UpdatePostDto } from 'src/dtos/post-dto';
import { PostModel } from 'src/models/postModel';
import { IPostsRepository } from './interfaces/posts-repository.interface';
import { Pagination, paginationPipeLine } from 'src/common/pagination';

@Injectable()
export class PostsRepository implements IPostsRepository {
  constructor(
    @InjectModel(PostModel)
    private readonly repository: ModelType<PostModel>,
  ) {}

  public async findById(id: string): Promise<PostModel> {
    return this.repository.findById(id).exec();
  }

  public async create(dto: CreatePostDto): Promise<PostModel> {
    return this.repository.create(dto);
  }

  public async update(id: string, dto: UpdatePostDto): Promise<PostModel> {
    return this.repository.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  public async delete(id: string): Promise<void> {
    await this.repository.findByIdAndDelete(id).exec();
  }

  public async findAll(): Promise<PostModel[]> {
    return this.repository.find({}).exec();
  }

  public async findByOptions<T extends Pagination<PostModel>>(
    dto: FindPostsDto,
  ): Promise<T> {
    const { page, limit, offset } = dto;
    const posts = await this.repository
      .aggregate(paginationPipeLine(page, limit, offset))
      .exec();

    return posts as T;
  }
}
