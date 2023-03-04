import { CreateCommentDto, UpdateCommentDto } from 'src/dtos/comment-dto';
import { CommentModel } from '../../models/commentModel';

export interface ICommentRepository {
  create(dto: CreateCommentDto): Promise<CommentModel>;
  update(id: string, dto: UpdateCommentDto): Promise<CommentModel>;
  delete(id: string): Promise<void>;
  findAll(): Promise<CommentModel[]>;
  findById(id: string): Promise<CommentModel>;
}
