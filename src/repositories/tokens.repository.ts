import { InjectModel } from 'nestjs-typegoose';
import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose/lib/types';

import { TokenPairModel } from 'src/models/tokenPairModel';
import { ITokensRepository } from './interfaces/tokens-repository.interface';
import { CreateTokenDto, UpdateTokenDto } from 'src/dtos/token-dto';
import { MongoGenericRepository } from './mongo-generic.repository';

@Injectable()
export class TokensRepository
  extends MongoGenericRepository<TokenPairModel, CreateTokenDto, UpdateTokenDto>
  implements ITokensRepository
{
  constructor(
    @InjectModel(TokenPairModel)
    private readonly tokenPairModel: ReturnModelType<typeof TokenPairModel>,
  ) {
    super(tokenPairModel);
  }

  public async findByRefreshToken(
    refreshToken: string,
  ): Promise<TokenPairModel> {
    return this.tokenPairModel.findOne({ refreshToken }).exec();
  }
}
