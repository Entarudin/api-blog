import { CreatePostDto, UpdatePostDto } from 'src/dtos/post-dto';
import { PostModel } from '../../models/postModel';
import { IFindPostOptions } from 'src/options/find-post.options.interface';

export interface IPostRepository {
  create(dto: CreatePostDto): Promise<PostModel>;
  update(id: string, dto: UpdatePostDto): Promise<PostModel>;
  delete(id: string): Promise<void>;
  findAll(): Promise<PostModel[]>;
  findByOptions(options: IFindPostOptions): Promise<PostModel[]>;
}
