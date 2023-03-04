import { NotFoundException } from '@nestjs/common';

export class PostByIdNotFoundExeption extends NotFoundException {
  constructor(id: string) {
    super(`Post with id=${id} not found`);
  }
}
