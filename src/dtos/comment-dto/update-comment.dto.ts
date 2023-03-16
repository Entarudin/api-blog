import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  readonly userId: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  readonly postId: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  readonly text: string;
}
