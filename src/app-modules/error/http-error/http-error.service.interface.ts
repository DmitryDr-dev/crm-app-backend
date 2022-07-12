export interface IHttpError {
  statusCode: number;
  message: string;
  context?: string;
}
