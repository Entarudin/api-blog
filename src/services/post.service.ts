import { Inject, Injectable } from '@nestjs/common';
import { RepositoriesProviderEnum } from '../enums/repositories-provider.enum';
import { IPostRepository } from 'src/repositories/interfaces/post-repository.interface';
import { CreatePostDto, FindPostsDto, UpdatePostDto } from 'src/dtos/post-dto';
import { PostModel } from 'src/models/postModel';
import { PostByIdNotFoundExeption } from 'src/exeptions/post-exeptions';
import { Pagination } from 'src/common/typegoose';

@Injectable()
export class PostService {
  constructor(
    @Inject(RepositoriesProviderEnum.PostRepository)
    private readonly postRepository: IPostRepository,
  ) {}

  public async create(dto: CreatePostDto): Promise<PostModel> {
    const post = await this.postRepository.create(dto);
    return post;
  }

  public async update(id: string, dto: UpdatePostDto): Promise<PostModel> {
    await this.checkExistPostById(id);
    const updatedRole = await this.postRepository.update(id, dto);
    return updatedRole;
  }

  public async delete(id: string): Promise<void> {
    await this.checkExistPostById(id);
    await this.postRepository.delete(id);
  }

  public async findAll(): Promise<PostModel[]> {
    const posts = await this.postRepository.findAll();
    return posts;
  }

  public async findBy(dto: FindPostsDto): Promise<Pagination<PostModel>> {
    const posts = await this.postRepository.findByOptions(dto);
    return posts;
  }

  private async checkExistPostById(id: string): Promise<PostModel> {
    const existsPost = await this.postRepository.findById(id);
    if (!existsPost) {
      throw new PostByIdNotFoundExeption(id);
    }
    return existsPost;
  }
}
