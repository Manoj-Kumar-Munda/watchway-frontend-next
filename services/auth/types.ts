export interface ApiResponse<T> {
  data: {
    data: T;
    message: string;
    statusCode: number;
    success: boolean;
  };
  status: number;
  statusText: 'OK' | 'Error';
}
