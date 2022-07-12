import 'reflect-metadata';
import express, { Express } from 'express';
import { Server } from 'http';
import cors from 'cors';
import { inject, injectable } from 'inversify';
import { APP_TYPES } from './common/ioc/app-bindings';

@injectable()
export class App {
  private app: Express;
  private server: Server;
  private port: number;

  constructor() {
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
        console.log(`[App] Server runs on port: ${this.port}`);
      })
      .on('error', (err) => {
        console.error(
          `[App] Error occurred while starting server: ${err.message} `,
        );
      });
  }
}
