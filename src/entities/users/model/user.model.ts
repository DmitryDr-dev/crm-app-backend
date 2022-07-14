import {
  prop,
  getModelForClass,
  ReturnModelType,
  pre,
} from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { regExpValidator } from '../../../utils/validators';
import { REG_EXP } from '../../../lib/constants';
import bcrypt from 'bcrypt';

@pre<User>('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(6);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
})
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

  public async isPasswordValid(password: string): Promise<boolean> {
    const result = await bcrypt.compare(password, this.password);
    return result;
  }
}

export const UserModel: ReturnModelType<typeof User> = getModelForClass(User);
