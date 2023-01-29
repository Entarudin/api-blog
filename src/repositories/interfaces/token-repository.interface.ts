import { CreateTokenDto } from 'src/dtos/token-dto/create-token.dto';
import { TokenPairModel } from '../../models/tokenPairModel';
import { UpdateTokenDto } from 'src/dtos/token-dto/update-token.dto';

export interface ITokenRepository {
  create(dto: CreateTokenDto): Promise<TokenPairModel>;
  update(id: string, dto: UpdateTokenDto): Promise<TokenPairModel>;
  delete(id: string): Promise<void>;
  findByRefreshToken(refreshToken: string): Promise<TokenPairModel>;
  findById(id: string): Promise<TokenPairModel>;
}
