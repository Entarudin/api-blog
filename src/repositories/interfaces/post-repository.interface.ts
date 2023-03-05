import { CreatePostDto, UpdatePostDto } from 'src/dtos/post-dto';
import { PostModel } from '../../models/postModel';
import { IFindPostOptions } from 'src/options/find-post.options.interface';
import { IBaseCRUDRepository } from './base-crud-repository.interface';

export interface IPostRepository
  extends IBaseCRUDRepository<PostModel, CreatePostDto, UpdatePostDto> {
  findByOptions(options: IFindPostOptions): Promise<PostModel[]>;
}
