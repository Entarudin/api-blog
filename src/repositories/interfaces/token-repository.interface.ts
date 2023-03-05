import { CreateTokenDto } from 'src/dtos/token-dto/create-token.dto';
import { TokenPairModel } from '../../models/tokenPairModel';
import { UpdateTokenDto } from 'src/dtos/token-dto/update-token.dto';
import { IBaseCRUDRepository } from './base-crud-repository.interface';

export interface ITokenRepository
  extends IBaseCRUDRepository<TokenPairModel, CreateTokenDto, UpdateTokenDto> {
  findByRefreshToken(refreshToken: string): Promise<TokenPairModel>;
}
