import { prop, getModelForClass, ReturnModelType } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { regExpValidator } from '../../../utils/validators';
import { REG_EXP } from '../../../lib/constants';

export class User extends TimeStamps {
  @prop({ required: true })
  public firstName: string;

  @prop({ required: true })
  public lastName: string;

  @prop({
    required: true,
    validate: {
      validator: (value: string) => {
        return new Promise((res) => {
          res(regExpValidator(REG_EXP.email, value));
        });
      },
    },
  })
  public email: string;

  @prop({ required: true })
  public password: string;

  @prop({ default: null })
  public token: string;
}

export const UserModel: ReturnModelType<typeof User> = getModelForClass(User);
