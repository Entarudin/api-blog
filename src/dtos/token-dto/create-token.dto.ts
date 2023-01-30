export class CreateTokenDto {
  readonly accessToken: string;

  readonly refreshToken: string;

  readonly userId: string;
}
