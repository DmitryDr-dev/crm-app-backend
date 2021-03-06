import { inject, injectable } from 'inversify';
import { APP_TYPES } from '../../../common/ioc/app-bindings';
import { CONTACTS_TYPES } from '../../../common/ioc/contact-bindings';
import { IContactsRepository } from '../repository';
import { ILoggerService } from '../../../app-modules/logger';
import { ContactDocumentType } from '../model';
import { IContactsService } from './contacts.service.interface';
import { CreateContactRequestDTO } from '../dto/createContact';
import { UpdateContactRequestDTO } from '../dto/updateContact';

@injectable()
export class ContactsService implements IContactsService {
  constructor(
    @inject(CONTACTS_TYPES.IContactsRepository)
    private contactsRepository: IContactsRepository,
    @inject(APP_TYPES.ILoggerService) private logger: ILoggerService,
  ) {}

  public async getContacts(
    userId: string,
  ): Promise<ContactDocumentType[] | [] | null> {
    try {
      const contacts = await this.contactsRepository.getContacts(userId);
      return contacts;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          `[ContactsService] Error on fetching contacts: ${error.message}`,
        );
      } else {
        this.logger.error(
          `[ContactsService] Error on fetching contacts: ${error}`,
        );
      }
      return null;
    }
  }

  public async getContactById(
    contactId: string,
    userId: string,
  ): Promise<ContactDocumentType | null> {
    try {
      const contact = await this.contactsRepository.getContactById(
        contactId,
        userId,
      );
      return contact;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          `[ContactsService] Error on fetching contact by id: ${error.message}`,
        );
      } else {
        this.logger.error(
          `[ContactsService] Error on fetching contact by id: ${error}`,
        );
      }
      return null;
    }
  }

  public async createContact(
    body: CreateContactRequestDTO,
    userId: string,
  ): Promise<ContactDocumentType | null> {
    try {
      const contact = await this.contactsRepository.createContact(body, userId);
      return contact;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          `[ContactsService] Error on creating new contact: ${error.message}`,
        );
      } else {
        this.logger.error(
          `[ContactsService] Error on creating new contact: ${error}`,
        );
      }
      return null;
    }
  }

  public async updateContact(
    contactId: string,
    userId: string,
    body: UpdateContactRequestDTO,
  ): Promise<ContactDocumentType | null> {
    try {
      const contact = await this.contactsRepository.updateContact(
        contactId,
        userId,
        body,
      );
      return contact;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          `[ContactsService] Error on creating new contact: ${error.message}`,
        );
      } else {
        this.logger.error(
          `[ContactsService] Error on creating new contact: ${error}`,
        );
      }
      return null;
    }
  }

  public async deleteContact(
    contactId: string,
    userId: string,
  ): Promise<ContactDocumentType | null> {
    try {
      const contact = await this.contactsRepository.deleteContact(
        contactId,
        userId,
      );
      return contact;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          `[ContactsService] Error on deleting contact: ${error.message}`,
        );
      } else {
        this.logger.error(
          `[ContactsService] Error on deleting contact: ${error}`,
        );
      }
      return null;
    }
  }
}
