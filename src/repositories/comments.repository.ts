import { InjectModel } from 'nestjs-typegoose';
import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose/lib/types';

import { CreateCommentDto, UpdateCommentDto } from 'src/dtos/comment-dto';
import { CommentModel } from 'src/models/commentModel';
import { ICommentsRepository } from './interfaces/comments-repository.interface';
import { MongoGenericRepository } from './mongo-generic.repository';

@Injectable()
export class CommentsRepository
  extends MongoGenericRepository<
    CommentModel,
    CreateCommentDto,
    UpdateCommentDto
  >
  implements ICommentsRepository
{
  constructor(
    @InjectModel(CommentModel)
    private readonly commentModel: ReturnModelType<typeof CommentModel>,
  ) {
    super(commentModel);
  }
}
