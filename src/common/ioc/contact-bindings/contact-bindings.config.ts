import { ContainerModule, interfaces } from 'inversify';
import { CONTACTS_TYPES } from './contact-bindings.types';
import {
  ContactsController,
  IContactsController,
} from '../../../entities/contacts/controller';
import {
  ContactsService,
  IContactsService,
} from '../../../entities/contacts/service';
import {
  ContactsRepository,
  IContactsRepository,
} from '../../../entities/contacts/repository';

export const contactsBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<IContactsController>(CONTACTS_TYPES.IContactsController)
    .to(ContactsController)
    .inSingletonScope();
  bind<IContactsService>(CONTACTS_TYPES.IContactsService)
    .to(ContactsService)
    .inSingletonScope();
  bind<IContactsRepository>(CONTACTS_TYPES.IContactsRepository)
    .to(ContactsRepository)
    .inSingletonScope();
});
