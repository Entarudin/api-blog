import { CreateUserDto } from 'src/dtos/user-dto';
import { BcryptService } from './bcrypt.service';
import { TokenService, TokensViewModel } from './token.service';
import { UserService } from './user.service';
import { UserAlreadyExistByEmailExeption } from 'src/exeptions/user-exeptions';
import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/models/userModel';
import { AuthRefreshDto } from 'src/dtos/auth-dto';
import {
  IncorectAuthDataExeption,
  RefreshTokenExpiredException,
} from 'src/exeptions/auth-exeptions';

export type LoginUserType = Omit<CreateUserDto, 'role'>;

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly bcryptService: BcryptService,
  ) {}

  public async registration(dto: CreateUserDto): Promise<TokensViewModel> {
    const existUser = await this.userService.getUserByEmail(dto.email);
    if (existUser) {
      throw new UserAlreadyExistByEmailExeption();
    }
    const user = await this.userService.create(dto);
    const tokens = await this.tokenService.generateTokens(user);
    return tokens;
  }

  public async login(fields: LoginUserType): Promise<TokensViewModel> {
    const user = await this.validateUser(fields);
    const tokens = await this.tokenService.generateTokens(user);
    return tokens;
  }

  public async refresh(dto: AuthRefreshDto): Promise<TokensViewModel> {
    const userData = await this.tokenService.validateRefreshToken(
      dto.refreshToken,
    );
    const tokenFromDb = await this.tokenService.findByRefreshToken(
      dto.refreshToken,
    );

    if (!userData || !tokenFromDb) {
      throw new RefreshTokenExpiredException();
    }
    const user = await this.userService.findById(userData.id);
    await this.tokenService.deleteToken(dto.refreshToken);
    const tokens = await this.tokenService.generateTokens(user);
    return tokens;
  }

  public async logout(dto: AuthRefreshDto): Promise<void> {
    await this.tokenService.deleteToken(dto.refreshToken);
  }

  private async validateUser(fields: LoginUserType): Promise<UserModel> {
    const user = await this.userService.getUserByEmail(fields.email);
    const passwordEquals = await this.bcryptService.compareHash(
      fields.passwordHash,
      user.passwordHash,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new IncorectAuthDataExeption();
  }
}
