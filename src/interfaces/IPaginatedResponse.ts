export interface PaginatedResponse<T> {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
}
