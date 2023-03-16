import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  readonly userId: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  readonly title: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  readonly body: string;
}
