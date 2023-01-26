import { prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
import { TokenPairModel } from '../tokenPairModel';
import { RoleModel } from '../roleModel';

export interface UserModel extends Base {}
export class UserModel extends TimeStamps {
  @prop({ unique: true })
  public email: string;

  @prop()
  public passwordHash: string;

  @prop({ type: () => RoleModel })
  public roles: RoleModel[];

  @prop({ type: () => TokenPairModel })
  public tokens: TokenPairModel[];
}
