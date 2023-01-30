import { prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';

export interface TokenPairModel extends Base {}
export class TokenPairModel extends TimeStamps {
  @prop()
  public accessToken: string;

  @prop()
  public refreshToken: string;

  @prop()
  public userId: Types.ObjectId;
}
