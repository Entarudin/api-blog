import { ApiProperty } from '@nestjs/swagger';

export class UpdateTokenDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  readonly accessToken: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  readonly refreshToken: string;
}
