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

  public async getContacts(
    userId: string,
  ): Promise<ContactDocumentType[] | []> {
    const result = await this.model.find({ owner: userId });
    return result;
  }

  public async getContactById(
    contactId: string,
    userId: string,
  ): Promise<ContactDocumentType | null> {
    const result = await this.model.findOne({
      _id: contactId,
      owner: userId,
    });
    return result;
  }

  public async createContact(
    body: CreateContactRequestDTO,
    userId: string,
  ): Promise<ContactDocumentType | null> {
    const result = await this.model.create({ ...body, owner: userId });
    return result;
  }

  public async updateContact(
    contactId: string,
    userId: string,
    body: UpdateContactRequestDTO,
  ): Promise<ContactDocumentType | null> {
    const result = await this.model.findOneAndUpdate(
      {
        _id: contactId,
        owner: userId,
      },
      { ...body },
      { new: true },
    );
    return result;
  }

  public async deleteContact(
    contactId: string,
    userId: string,
  ): Promise<ContactDocumentType | null> {
    const result = await this.model.findOneAndRemove({
      _id: contactId,
      owner: userId,
    });
    return result;
  }
}
