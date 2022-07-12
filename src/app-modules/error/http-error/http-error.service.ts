import { IHttpError } from './http-error.service.interface';

export class HttpError extends Error implements IHttpError {
  public statusCode: number;
  public context?: string;

  constructor(statusCode: number, message: string, context?: string) {
    super(message);
    this.statusCode = statusCode;
    this.context = context;
  }
}
