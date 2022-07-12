import 'reflect-metadata';
import 'dotenv/config';
import express, { Express } from 'express';
import { Server } from 'http';
import cors from 'cors';
import { inject, injectable } from 'inversify';
import { APP_TYPES } from './common/ioc/app-bindings';
import { ILoggerService } from './app-modules/logger';

@injectable()
export class App {
  private app: Express;
  private server: Server;
  private port: number;

  constructor(
    @inject(APP_TYPES.ILoggerService) private logger: ILoggerService,
  ) {
    this.app = express();
    this.port = parseInt(process.env.PORT as string, 2) || 3000;
  }

  private useMiddlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  public async runServer(): Promise<void> {
    this.useMiddlewares();

    this.server = this.app
      .listen(this.port)
      .on('listening', () => {
        this.logger.log(`[App] Server runs on port: ${this.port}`);
      })
      .on('error', (err) => {
        this.logger.error(
          `[App] Error occurred while starting server: ${err.message} `,
        );
      });
  }
}
