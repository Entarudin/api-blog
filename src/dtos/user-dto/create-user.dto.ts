import { ApiProperty } from '@nestjs/swagger';
import { RolesEnum } from 'src/enums/roles.enum';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  readonly email: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  readonly passwordHash: string;

  @ApiProperty({
    enum: RolesEnum,
    required: true,
  })
  readonly role: string;
}
