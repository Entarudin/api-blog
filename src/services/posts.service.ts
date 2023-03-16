import { Inject, Injectable } from '@nestjs/common';
import { RepositoriesProviderEnum } from '../enums/repositories-provider.enum';
import { IPostsRepository } from 'src/repositories/interfaces/posts-repository.interface';
import { CreatePostDto, FindPostsDto, UpdatePostDto } from 'src/dtos/post-dto';
import { PostModel } from 'src/models/postModel';
import { PostByIdNotFoundExeption } from 'src/exeptions/post-exeptions';
import { Pagination } from 'src/common/pagination';

@Injectable()
export class PostsService {
  constructor(
    @Inject(RepositoriesProviderEnum.PostsRepository)
    private readonly postsRepository: IPostsRepository,
  ) {}

  public async create(dto: CreatePostDto): Promise<PostModel> {
    const post = await this.postsRepository.create(dto);
    return post;
  }

  public async update(id: string, dto: UpdatePostDto): Promise<PostModel> {
    await this.checkExistPostById(id);
    const updatedRole = await this.postsRepository.update(id, dto);
    return updatedRole;
  }

  public async delete(id: string): Promise<void> {
    await this.checkExistPostById(id);
    await this.postsRepository.delete(id);
  }

  public async findAll(): Promise<PostModel[]> {
    const posts = await this.postsRepository.findAll();
    return posts;
  }

  public async findBy(dto: FindPostsDto): Promise<Pagination<PostModel>> {
    const posts = await this.postsRepository.findByOptions(dto);
    return posts;
  }

  private async checkExistPostById(id: string): Promise<PostModel> {
    const existsPost = await this.postsRepository.findById(id);
    if (!existsPost) {
      throw new PostByIdNotFoundExeption(id);
    }
    return existsPost;
  }
}
