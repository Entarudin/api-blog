import { CreatePostDto, UpdatePostDto, FindPostsDto } from 'src/dtos/post-dto';
import { PostModel } from '../../models/postModel';
import { IBaseCRUDRepository } from './base-crud-repository.interface';
import { Pagination } from 'src/common/pagination';

export interface IPostsRepository
  extends IBaseCRUDRepository<PostModel, CreatePostDto, UpdatePostDto> {
  findByOptions<T extends Pagination<PostModel>>(dto: FindPostsDto): Promise<T>;
}
