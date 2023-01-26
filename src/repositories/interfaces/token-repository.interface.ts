import { TokenPairModel } from '../../models/tokenPairModel';

export interface ITokenRepository {
  create(name: string): Promise<TokenPairModel>;
  update(id: string, name: string): Promise<TokenPairModel>;
  delete(id: string): Promise<void>;
  findByRefreshToken(refreshToken: string): Promise<TokenPairModel>;
}
