import { IPage, ILimit, IOffset } from 'src/options';

export class FindUsersDto implements IPage, ILimit, IOffset {
  offset?: number;
  limit?: number;
  page?: number;
}
