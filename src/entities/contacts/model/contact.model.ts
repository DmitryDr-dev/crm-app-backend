import { prop, getModelForClass, ReturnModelType } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { regExpValidator } from '../../../utils/validators';
import { REG_EXP } from '../../../lib/constants';

enum EmailType {
  Personal = 'personal',
  Work = 'work',
  Home = 'home',
  Other = 'other',
}

enum PhoneType {
  Personal = 'personal',
  Work = 'work',
  Home = 'home',
  Fax = 'fax',
  WorkFax = 'workFax',
  Other = 'other',
}

class WorkData {
  @prop()
  public companyName?: string;

  @prop()
  public department?: string;

  @prop()
  public jobTitle?: string;
}

class PhoneData {
  @prop({
    validate: {
      validator: (value: string) => {
        if (!value) return true;
        return new Promise((res) => {
          res(regExpValidator(REG_EXP.phone, value));
        });
      },
    },
  })
  public phoneNumber?: string;

  @prop({
    type: () => String,
    enum: Object.values(PhoneType),
    default: PhoneType.Personal,
  })
  public phoneType?: string;
}

class EmailData {
  @prop({
    validate: {
      validator: (value: string) => {
        return new Promise((res) => {
          res(regExpValidator(REG_EXP.email, value));
        });
      },
    },
  })
  public emailAddress?: string;

  @prop({
    type: () => String,
    enum: Object.values(EmailType),
    default: EmailType.Personal,
  })
  public emailType?: string;
}

class AddressData {
  @prop()
  address?: string;
  @prop()
  city?: string;
  @prop()
  region?: string;
  @prop()
  country?: string;
  @prop()
  zip?: string;
}

export class Contact extends TimeStamps {
  @prop({ required: true })
  public firstName: string;

  @prop()
  public lastName?: string;

  @prop({ type: () => WorkData })
  public workData?: WorkData[];

  @prop({ type: () => EmailData })
  public emailData?: EmailData[];

  @prop({ type: () => PhoneData })
  public phoneData?: PhoneData[];

  @prop()
  public note?: string;

  @prop({ type: () => AddressData })
  public addressData?: AddressData[];

  @prop()
  public website?: string;
}

export const ContactModel: ReturnModelType<typeof Contact> =
  getModelForClass(Contact);
