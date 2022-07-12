import { injectable } from 'inversify';
import { Logger } from 'tslog';

@injectable()
export class LoggerService {
  private logger: Logger;
  constructor() {
    this.logger = new Logger({
      displayFilePath: 'hidden',
      displayFunctionName: false,
      displayInstanceName: false,
      displayLoggerName: false,
    });
  }

  public log(...args: unknown[]): void {
    this.logger.info(...args);
  }

  public error(...args: unknown[]): void {
    this.logger.error(...args);
  }

  public warn(...args: unknown[]): void {
    this.logger.warn(...args);
  }
}
