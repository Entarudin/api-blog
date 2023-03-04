import { NotFoundException } from '@nestjs/common';

export class CommentByIdNotFoundExeption extends NotFoundException {
  constructor(id: string) {
    super(`Comment with id=${id} not found`);
  }
}
