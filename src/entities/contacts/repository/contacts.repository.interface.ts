import { CreateContactRequestDTO } from '../dto/createContact';
import { UpdateContactRequestDTO } from '../dto/updateContact';
import { ContactDocumentType } from '../model';

export interface IContactsRepository {
  getContacts: () => Promise<ContactDocumentType[] | []>;

  getContactById: (contactId: string) => Promise<ContactDocumentType | null>;

  createContact: (
    body: CreateContactRequestDTO,
  ) => Promise<ContactDocumentType | null>;

  updateContact: (
    contactId: string,
    body: UpdateContactRequestDTO,
  ) => Promise<ContactDocumentType | null>;

  deleteContact: (contactId: string) => Promise<ContactDocumentType | null>;
}
