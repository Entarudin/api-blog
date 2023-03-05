import { CreateCommentDto, UpdateCommentDto } from 'src/dtos/comment-dto';
import { CommentModel } from '../../models/commentModel';
import { IBaseCRUDRepository } from './base-crud-repository.interface';

export interface ICommentRepository
  extends IBaseCRUDRepository<
    CommentModel,
    CreateCommentDto,
    UpdateCommentDto
  > {}
