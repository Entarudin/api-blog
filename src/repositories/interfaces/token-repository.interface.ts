import { CreateTokenDto, UpdateTokenDto } from 'src/dtos/token-dto';
import { TokenPairModel } from '../../models/tokenPairModel';
import { IBaseCRUDRepository } from './base-crud-repository.interface';

export interface ITokenRepository
  extends IBaseCRUDRepository<TokenPairModel, CreateTokenDto, UpdateTokenDto> {
  findByRefreshToken(refreshToken: string): Promise<TokenPairModel>;
}
