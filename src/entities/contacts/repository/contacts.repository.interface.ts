import { CreateContactRequestDTO } from '../dto/createContact';
import { UpdateContactRequestDTO } from '../dto/updateContact';
import { ContactDocumentType } from '../model';

export interface IContactsRepository {
  getContacts: (userId: string) => Promise<ContactDocumentType[] | []>;

  getContactById: (
    contactId: string,
    userId: string,
  ) => Promise<ContactDocumentType | null>;

  createContact: (
    body: CreateContactRequestDTO,
    userId: string,
  ) => Promise<ContactDocumentType | null>;

  updateContact: (
    contactId: string,
    userId: string,
    body: UpdateContactRequestDTO,
  ) => Promise<ContactDocumentType | null>;

  deleteContact: (
    contactId: string,
    userId: string,
  ) => Promise<ContactDocumentType | null>;
}
