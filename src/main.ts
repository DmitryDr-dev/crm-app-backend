import { Container } from 'inversify';
import { appBindings, APP_TYPES } from './common/ioc/app-bindings';
import { contactsBindings } from './common/ioc/contact-bindings';
import { authBindings } from './common/ioc/auth-bindings';
import { usersBindings } from './common/ioc/users-bindings';
import { App } from './app';

async function bootstrap(): Promise<void> {
  const appContainer = new Container();
  appContainer.load(appBindings, contactsBindings, authBindings, usersBindings);
  const app = appContainer.get<App>(APP_TYPES.App);
  await app.runServer();
}

bootstrap();
