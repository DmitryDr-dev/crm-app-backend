export interface IMongoDbConnectionService {
  connectDb: () => Promise<void>;
  disconnectFromDb: () => Promise<void>;
}
