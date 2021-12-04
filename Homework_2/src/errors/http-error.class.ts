export class HttpError extends Error {
  statusCode: number;
  context?: string;

  constructor(statusCode: number, message: string, context?: string) {
    super(message);
    this.context = context;
    this.message = message;
    this.statusCode = statusCode;
  }
}
