export class CreateUserDto {
  readonly email: string;
  readonly passwordHash: string;
  readonly role: string;
}
