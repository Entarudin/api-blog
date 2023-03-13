import { IPage, ILimit, IOffset } from 'src/options';

export class FindPostsDto implements IPage, ILimit, IOffset {
  offset?: number;
  limit?: number;
  page?: number;
}
