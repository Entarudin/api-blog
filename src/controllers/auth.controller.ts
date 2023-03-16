import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthRefreshDto } from 'src/dtos/auth-dto';
import { CreateUserDto } from 'src/dtos/user-dto';
import { AuthService, LoginUserType } from 'src/services/auth.service';
import { TokensViewModel } from 'src/services/tokens.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/registration')
  public async registration(
    @Body() dto: CreateUserDto,
  ): Promise<TokensViewModel> {
    const tokens = await this.authService.registration(dto);
    return tokens;
  }

  @Post('/login')
  public async login(@Body() dto: LoginUserType): Promise<TokensViewModel> {
    const tokens = await this.authService.login(dto);
    return tokens;
  }

  @Post('/refresh')
  public async refresh(@Body() dto: AuthRefreshDto): Promise<TokensViewModel> {
    const tokens = await this.authService.refresh(dto);
    return tokens;
  }

  @Post('/logout')
  public async logout(@Body() dto: AuthRefreshDto): Promise<void> {
    return await this.authService.logout(dto);
  }
}
