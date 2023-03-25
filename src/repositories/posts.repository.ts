import { InjectModel } from 'nestjs-typegoose';
import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose/lib/types';

import { CreatePostDto, FindPostsDto, UpdatePostDto } from 'src/dtos/post-dto';
import { PostModel } from 'src/models/postModel';
import { IPostsRepository } from './interfaces/posts-repository.interface';
import { Pagination, paginationPipeLine } from 'src/common/pagination';
import { MongoGenericRepository } from './mongo-generic.repository';

@Injectable()
export class PostsRepository
  extends MongoGenericRepository<PostModel, CreatePostDto, UpdatePostDto>
  implements IPostsRepository
{
  constructor(
    @InjectModel(PostModel)
    private readonly postModel: ReturnModelType<typeof PostModel>,
  ) {
    super(postModel);
  }

  public async findByOptions<T extends Pagination<PostModel>>(
    dto: FindPostsDto,
  ): Promise<T> {
    const { page, limit, offset } = dto;
    const posts = await this.postModel
      .aggregate(paginationPipeLine(page, limit, offset))
      .exec();

    return posts as T;
  }
}
