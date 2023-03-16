import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  readonly name: string;
}
