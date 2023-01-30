import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RoleModel } from '../models/roleModel';
import { TokenPairModel } from '../models/tokenPairModel';
import { UserModel } from '../models/userModel';
import { ITokenRepository } from 'src/repositories/interfaces/token-repository.interface';
import { ConfigService } from '@nestjs/config';
import { RepositoriesProviderEnum } from '../enums/repositories-provider.enum';
import { CreateTokenDto } from 'src/dtos/token-dto/create-token.dto';
import { LocalEnvPathsEnum } from 'src/enums/local-env-paths.enum';
import { TokensByRefreshTokenNotFoundExeption } from 'src/exeptions/token-exeptions';

export type JwtTokenPaylod = {
  id: string;
  email: string;
  roles: RoleModel[];
};

export type TokensViewModel = {
  refreshToken: string;
  accessToken: string;
};

@Injectable()
export class TokenService {
  constructor(
    @Inject(RepositoriesProviderEnum.TokenRepository)
    private readonly tokenRepository: ITokenRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  public async create(dto: CreateTokenDto): Promise<TokenPairModel> {
    const token = await this.tokenRepository.create(dto);
    return token;
  }

  public async findByRefreshToken(
    refreshToken: string,
  ): Promise<TokenPairModel> {
    const token = await this.tokenRepository.findByRefreshToken(refreshToken);
    return token;
  }

  public async deleteToken(refreshToken: string): Promise<void> {
    const findToken = await this.findByRefreshToken(refreshToken);
    if (!findToken) {
      throw new TokensByRefreshTokenNotFoundExeption(refreshToken);
    }
    const tokenId = findToken._id.toString();
    await this.tokenRepository.delete(tokenId);
  }

  public async generateTokens(user: UserModel): Promise<TokensViewModel> {
    const payload: JwtTokenPaylod = {
      id: user._id.toString(),
      email: user.email,
      roles: user.roles,
    };
    const accessToken = await this.generateAccessToken(payload);
    const refreshToken = await this.generateRefreshToken(payload);
    const dto: CreateTokenDto = {
      accessToken,
      refreshToken,
      userId: user._id.toString(),
    };
    await this.create(dto);

    return { accessToken, refreshToken };
  }

  private async generateAccessToken(paylod: JwtTokenPaylod): Promise<string> {
    const jwtAccessSecret = await this.configService.get(
      LocalEnvPathsEnum.JWT_ACCESS_SECRET,
    );
    const jwtAccessExpiration = await this.configService.get(
      LocalEnvPathsEnum.JWT_ACCESS_EXPIRATION,
    );
    const token = await this.jwtService.sign(paylod, {
      secret: jwtAccessSecret,
      expiresIn: jwtAccessExpiration,
    });
    return token;
  }

  private async generateRefreshToken(paylod: JwtTokenPaylod): Promise<string> {
    const jwtRefreshSecret = await this.configService.get(
      LocalEnvPathsEnum.JWT_REFRESH_SECRET,
    );
    const jwtRefreshExpiration = await this.configService.get(
      LocalEnvPathsEnum.JWT_REFRESH_EXPIRATION,
    );
    const token = await this.jwtService.sign(paylod, {
      secret: jwtRefreshSecret,
      expiresIn: jwtRefreshExpiration,
    });
    return token;
  }

  public async validateAccessToken(
    token: string,
  ): Promise<JwtTokenPaylod | null> {
    try {
      const jwtAccessSecret = await this.configService.get(
        LocalEnvPathsEnum.JWT_ACCESS_SECRET,
      );
      const userData: JwtTokenPaylod = this.jwtService.verify(token, {
        secret: jwtAccessSecret,
      });
      return userData;
    } catch (e) {
      return null;
    }
  }

  public async validateRefreshToken(
    token: string,
  ): Promise<JwtTokenPaylod | null> {
    try {
      const jwtRefreshSecret = await this.configService.get(
        LocalEnvPathsEnum.JWT_REFRESH_SECRET,
      );
      const userData: JwtTokenPaylod = this.jwtService.verify(token, {
        secret: jwtRefreshSecret,
      });
      return userData;
    } catch (e) {
      return null;
    }
  }
}
