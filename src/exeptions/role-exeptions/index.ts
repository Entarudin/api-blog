import { BadRequestException, NotFoundException } from '@nestjs/common';

export class RoleAlreadyExistByNameExeption extends BadRequestException {
  constructor() {
    super('Role with this name already exists');
  }
}

export class RoleByIdNotFoundExeption extends NotFoundException {
  constructor(id: string) {
    super(`Role with id=${id} not found`);
  }
}

export class RoleByNameNotFoundExeption extends NotFoundException {
  constructor(name: string) {
    super(`Role with name=${name} not found`);
  }
}
