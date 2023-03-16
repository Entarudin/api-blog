import { ApiPropertyOptional } from '@nestjs/swagger';
import { IPage, ILimit, IOffset } from 'src/options';

export class FindPostsDto implements IPage, ILimit, IOffset {
  @ApiPropertyOptional({
    type: Number,
  })
  offset?: number;

  @ApiPropertyOptional({
    type: Number,
  })
  limit?: number;

  @ApiPropertyOptional({
    type: Number,
  })
  page?: number;
}
