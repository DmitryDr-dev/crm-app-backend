import { Container } from 'inversify';
import { appBindings, APP_TYPES } from './common/ioc/app-bindings';
import { contactsBindings } from './common/ioc/contact-bindings';
import { App } from './app';

async function bootstrap(): Promise<void> {
  const appContainer = new Container();
  appContainer.load(appBindings, contactsBindings);
  const app = appContainer.get<App>(APP_TYPES.App);
  await app.runServer();
}

bootstrap();
