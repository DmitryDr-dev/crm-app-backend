import 'reflect-metadata';
import 'dotenv/config';
import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { IMongoDbConnectionService } from './app-modules/database/mongodb';
import { IErrorHandlerService } from './app-modules/error/error-handler';
import { ILoggerService } from './app-modules/logger';
import { AuthController } from './auth/controller';
import { APP_TYPES } from './common/ioc/app-bindings';
import { AUTH_TYPES } from './common/ioc/auth-bindings';
import { CONTACTS_TYPES } from './common/ioc/contact-bindings';
import { ContactsController } from './entities/contacts/controller';
import { HttpCode } from './lib/constants';

const swaggerDocument = YAML.load('./swagger.yaml');

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
    @inject(AUTH_TYPES.IAuthController) private authController: AuthController,
  ) {
    this.app = express();
    this.port = parseInt(process.env.PORT as string, 10) || 3000;
  }

  private useMiddlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  private useRoutes(): void {
    this.app.use('/auth', this.authController.router.bind(this.authController));
    this.app.use(
      '/contacts',
      this.contactsController.router.bind(this.contactsController),
    );
    this.app.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument),
    );

    this.app.use((_req: Request, res: Response) => {
      res.status(HttpCode.NotFound).json({
        message: 'Not Found',
      });
    });
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
