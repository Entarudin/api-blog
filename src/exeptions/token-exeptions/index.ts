import { NotFoundException } from '@nestjs/common';

export class TokensByRefreshTokenNotFoundExeption extends NotFoundException {
  constructor(refreshToken: string) {
    super(`Token Entity with refreshToken = ${refreshToken} not found`);
  }
}
