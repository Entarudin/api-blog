import { Inject, Injectable } from '@nestjs/common';
import { RepositoriesProviderEnum } from '../enums/repositories-provider.enum';
import { CreateCommentDto, UpdateCommentDto } from 'src/dtos/comment-dto';
import { CommentModel } from 'src/models/commentModel';
import { CommentByIdNotFoundExeption } from 'src/exeptions/comment-exeptions';
import { ICommentRepository } from 'src/repositories/interfaces/comment-repository.interface';

@Injectable()
export class CommentService {
  constructor(
    @Inject(RepositoriesProviderEnum.CommentRepository)
    private readonly commentRepository: ICommentRepository,
  ) {}

  public async create(dto: CreateCommentDto): Promise<CommentModel> {
    const comment = await this.commentRepository.create(dto);
    return comment;
  }

  public async update(
    id: string,
    dto: UpdateCommentDto,
  ): Promise<CommentModel> {
    await this.checkExistCommentById(id);
    const updatedComment = await this.commentRepository.update(id, dto);
    return updatedComment;
  }

  public async delete(id: string): Promise<void> {
    await this.checkExistCommentById(id);
    await this.commentRepository.delete(id);
  }

  public async findAll(): Promise<CommentModel[]> {
    const comments = await this.commentRepository.findAll();
    return comments;
  }

  private async checkExistCommentById(id: string): Promise<CommentModel> {
    const existsComment = await this.commentRepository.findById(id);
    if (!existsComment) {
      throw new CommentByIdNotFoundExeption(id);
    }
    return existsComment;
  }
}
