import 'dotenv/config';
import mongoose, { Connection, Mongoose } from 'mongoose';
import { inject, injectable } from 'inversify';
import { APP_TYPES } from '../../../common/ioc/app-bindings';
import { ILoggerService } from '../../logger';
import { IMongoDbConnectionService } from './mongodb-connection.service.interface';

@injectable()
export class MongoDbConnectionService implements IMongoDbConnectionService {
  #dbName: string | undefined;
  #dbUser: string | undefined;
  #dbPass: string | undefined;
  #dbHost: string | undefined;
  #dbPort: string | undefined;
  #dbConnection: Connection;
  #db: Mongoose;

  constructor(
    @inject(APP_TYPES.ILoggerService) private logger: ILoggerService,
  ) {
    this.#dbName = process.env.DB_NAME;
    this.#dbUser = process.env.DB_USERNAME;
    this.#dbPass = process.env.DB_PASS;
    this.#dbHost = process.env.DB_HOST;
    this.#dbPort = process.env.DB_PORT;
    this.#dbConnection = mongoose.connection;
  }

  public async connectDb(): Promise<void> {
    try {
      this.onConnected();
      this.onDisconnecting();
      this.onError();
      this.onTerminationSignal();

      this.#db = await mongoose.connect(
        `mongodb+srv://${this.#dbUser}:${this.#dbPass}@${this.#dbHost}.${
          this.#dbPort
        }.mongodb.net/${this.#dbName}`,
      );
    } catch (err) {
      if (err instanceof Error) {
        this.logger.error(
          `[Mongoose] Error on connecting database: ${err.message}`,
        );
      } else {
        this.logger.error(`[Mongoose] Error on connecting database: ${err}`);
      }
    }
  }

  public async disconnectFromDb(): Promise<void> {
    try {
      await this.#db.disconnect(() =>
        this.logger.log('[Mongoose] The default connection closed'),
      );
    } catch (err) {
      if (err instanceof Error) {
        this.logger.error(
          `[Mongoose] Error on disconnecting from database: ${err.message}`,
        );
      } else {
        this.logger.error(
          `[Mongoose] Error on disconnecting from database: ${err}`,
        );
      }
    }
  }

  private onConnected(): void {
    this.#dbConnection.on('connected', () => {
      this.logger.log(
        `[Mongoose] Connected to database successfully: ${
          this.#dbConnection.name
        }`,
      );
    });
  }

  private onDisconnecting(): void {
    this.#dbConnection.on('disconnecting', () => {
      this.logger.log('[Mongoose] Disconnecting from database');
    });
  }

  private onError(): void {
    this.#dbConnection.on('error', (err) => {
      this.logger.error(
        `[Mongoose] Error on connecting database: ${err.message}`,
      );
    });
  }

  private onTerminationSignal(): void {
    process.on('SIGINT', () => {
      this.disconnectFromDb().then(() => {
        this.logger.log(
          '[Mongoose] The default connection disconnected through app termination',
        );
        process.exit(0);
      });
    });
  }
}
