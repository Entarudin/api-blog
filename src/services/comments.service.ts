import { Inject, Injectable } from '@nestjs/common';
import { RepositoriesProviderEnum } from '../enums/repositories-provider.enum';
import { CreateCommentDto, UpdateCommentDto } from 'src/dtos/comment-dto';
import { CommentModel } from 'src/models/commentModel';
import { CommentByIdNotFoundExeption } from 'src/exeptions/comment-exeptions';
import { ICommentsRepository } from 'src/repositories/interfaces/comments-repository.interface';

@Injectable()
export class CommentsService {
  constructor(
    @Inject(RepositoriesProviderEnum.CommentsRepository)
    private readonly commentsRepository: ICommentsRepository,
  ) {}

  public async create(dto: CreateCommentDto): Promise<CommentModel> {
    const comment = await this.commentsRepository.create(dto);
    return comment;
  }

  public async update(
    id: string,
    dto: UpdateCommentDto,
  ): Promise<CommentModel> {
    await this.checkExistCommentById(id);
    const updatedComment = await this.commentsRepository.update(id, dto);
    return updatedComment;
  }

  public async delete(id: string): Promise<void> {
    await this.checkExistCommentById(id);
    await this.commentsRepository.delete(id);
  }

  public async findAll(): Promise<CommentModel[]> {
    const comments = await this.commentsRepository.findAll();
    return comments;
  }

  private async checkExistCommentById(id: string): Promise<CommentModel> {
    const existsComment = await this.commentsRepository.findById(id);
    if (!existsComment) {
      throw new CommentByIdNotFoundExeption(id);
    }
    return existsComment;
  }
}
