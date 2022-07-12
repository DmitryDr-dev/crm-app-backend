import 'reflect-metadata';
import 'dotenv/config';
import express, { Express } from 'express';
import { Server } from 'http';
import cors from 'cors';
import { inject, injectable } from 'inversify';
import { APP_TYPES } from './common/ioc/app-bindings';
import { ILoggerService } from './app-modules/logger';
import { IErrorHandlerService } from './app-modules/error/error-handler';
import { IMongoDbConnectionService } from './app-modules/database/mongodb';
import { CONTACTS_TYPES } from './common/ioc/contact-bindings';
import { ContactsController } from './entities/contacts/controller';

@injectable()
export class App {
  private app: Express;
  private server: Server;
  private port: number;

  constructor(
    @inject(APP_TYPES.ILoggerService) private logger: ILoggerService,
    @inject(APP_TYPES.IErrorhandlerService)
    private errorHandler: IErrorHandlerService,
    @inject(APP_TYPES.IMongoDbConnectionService)
    private mongoDbService: IMongoDbConnectionService,
    @inject(CONTACTS_TYPES.IContactsController)
    private contactsController: ContactsController,
  ) {
    this.app = express();
    this.port = parseInt(process.env.PORT as string, 2) || 3000;
  }

  private useMiddlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  private useRoutes(): void {
    this.app.use(
      '/contacts',
      this.contactsController.router.bind(this.contactsController),
    );
  }

  private useErrorHandler(): void {
    this.app.use(this.errorHandler.catch.bind(this.errorHandler));
  }

  public async runServer(): Promise<void> {
    this.useMiddlewares();
    this.useRoutes();
    this.useErrorHandler();

    await this.mongoDbService.connectDb();

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
