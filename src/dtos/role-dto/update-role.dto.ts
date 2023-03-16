import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  readonly name: string;
}
