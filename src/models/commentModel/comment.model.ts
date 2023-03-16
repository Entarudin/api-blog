import { prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';

export interface CommentModel extends Base {}
export class CommentModel extends TimeStamps {
  @prop()
  public text: string;

  @prop()
  public postId: Types.ObjectId;

  @prop()
  public userId: Types.ObjectId;
}
