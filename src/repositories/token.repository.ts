import { InjectModel } from 'nestjs-typegoose';
import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { TokenPairModel } from 'src/models/tokenPairModel';
import { ITokenRepository } from './interfaces/token-repository.interface';

@Injectable()
export class TokenRepository implements ITokenRepository {
  constructor(
    @InjectModel(TokenPairModel)
    private readonly repository: ModelType<TokenPairModel>,
  ) {}

  public async create(name: string): Promise<TokenPairModel> {
    return this.repository.create(name);
  }

  public async update(id: string, name: string): Promise<TokenPairModel> {
    return this.repository
      .findByIdAndUpdate(id, { name }, { new: true })
      .exec();
  }

  public async delete(id: string): Promise<void> {
    await this.repository.findByIdAndDelete(id).exec();
  }

  public async findByRefreshToken(
    refreshToken: string,
  ): Promise<TokenPairModel> {
    return this.repository.findOne({ refreshToken }).exec();
  }
}
