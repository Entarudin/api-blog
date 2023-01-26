import { prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';

export interface CommentModel extends Base {}
export class CommentModel extends TimeStamps {
  @prop()
  public text: string;

  @prop()
  public postId: string;

  @prop()
  public userId: string;
}
