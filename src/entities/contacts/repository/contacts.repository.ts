import { injectable } from 'inversify';
import { ReturnModelType } from '@typegoose/typegoose';
import { ContactDocumentType, Contact, ContactModel } from '../model';
import { IContactsRepository } from './contacts.repository.interface';
import { CreateContactRequestDTO } from '../dto/createContact';
import { UpdateContactRequestDTO } from '../dto/updateContact';

@injectable()
export class ContactsRepository implements IContactsRepository {
  private model: ReturnModelType<typeof Contact>;

  constructor() {
    this.model = ContactModel;
  }

  public async getContacts(): Promise<ContactDocumentType[] | []> {
    const result = await this.model.find();
    return result;
  }

  public async getContactById(
    contactId: string,
  ): Promise<ContactDocumentType | null> {
    const result = await this.model.findOne({
      _id: contactId,
    });
    return result;
  }

  public async createContact(
    body: CreateContactRequestDTO,
  ): Promise<ContactDocumentType | null> {
    const result = await this.model.create({ ...body });
    return result;
  }

  public async updateContact(
    contactId: string,
    body: UpdateContactRequestDTO,
  ): Promise<ContactDocumentType | null> {
    const result = await this.model.findOneAndUpdate(
      {
        _id: contactId,
      },
      { ...body },
      { new: true },
    );
    return result;
  }

  public async deleteContact(
    contactId: string,
  ): Promise<ContactDocumentType | null> {
    const result = await this.model.findOneAndRemove({
      _id: contactId,
    });
    return result;
  }
}
