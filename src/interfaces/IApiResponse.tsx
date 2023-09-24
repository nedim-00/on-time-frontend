export interface ApiResponse<T> {
  data: T;
  errors: [];
  statusCode: boolean;
  succeeded: boolean;
}
