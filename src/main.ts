import { Container } from 'inversify';
import { appBindings, APP_TYPES } from './common/ioc/app-bindings';
import { App } from './app';

async function bootstrap(): Promise<void> {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(APP_TYPES.App);
  await app.runServer();
}

bootstrap();
