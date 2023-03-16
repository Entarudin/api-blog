export type Pagination<T> = [
  {
    items: T[];
    page: number;
    hasNextPage: boolean;
    totalPages: number;
    totalItems: number;
  },
];
