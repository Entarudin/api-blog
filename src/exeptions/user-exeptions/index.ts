import { BadRequestException, NotFoundException } from '@nestjs/common';

export class UserByIdNotFoundExeption extends NotFoundException {
  constructor(id: string) {
    super(`User with id=${id} not found`);
  }
}

export class UserAlreadyExistByEmailExeption extends BadRequestException {
  constructor() {
    super('User with this email already exists');
  }
}
