import { CreatePostDto, UpdatePostDto } from 'src/dtos/post-dto';
import { PostModel } from 'src/models/postModel';
import { IFindPostOptions } from 'src/options/find-post.options.interface';
import { IPostRepository } from './interfaces/post-repository.interface';
import { InjectModel } from 'nestjs-typegoose';
import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';

@Injectable()
export class PostRepository implements IPostRepository {
  constructor(
    @InjectModel(PostModel)
    private readonly repository: ModelType<PostModel>,
  ) {}

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

  public async findByOptions(options: IFindPostOptions): Promise<PostModel[]> {
    const {} = options;
    throw new Error('Method not implemented.');
  }
}
