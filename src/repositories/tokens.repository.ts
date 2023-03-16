import { InjectModel } from 'nestjs-typegoose';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';

import { TokenPairModel } from 'src/models/tokenPairModel';
import { ITokensRepository } from './interfaces/tokens-repository.interface';
import { CreateTokenDto, UpdateTokenDto } from 'src/dtos/token-dto';

@Injectable()
export class TokensRepository implements ITokensRepository {
  constructor(
    @InjectModel(TokenPairModel)
    private readonly repository: ModelType<TokenPairModel>,
  ) {}

  public async findAll(): Promise<TokenPairModel[]> {
    throw new NotImplementedException();
  }

  public async findById(id: string): Promise<TokenPairModel> {
    return this.repository.findById(id).exec();
  }

  public async create(dto: CreateTokenDto): Promise<TokenPairModel> {
    return this.repository.create(dto);
  }

  public async update(
    id: string,
    dto: UpdateTokenDto,
  ): Promise<TokenPairModel> {
    return this.repository.findByIdAndUpdate(id, dto, { new: true }).exec();
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
