import { prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';

export interface RoleModel extends Base {}
export class RoleModel extends TimeStamps {
  @prop()
  public name: string;
}
