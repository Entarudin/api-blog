import { prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';

export interface PostModel extends Base {}
export class PostModel extends TimeStamps {
  @prop()
  public title: string;

  @prop()
  public body: string;

  @prop()
  public userId: string;
}
