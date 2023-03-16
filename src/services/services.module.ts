import { Module, Provider } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RolesService } from './roles.service';
import { UsersService } from './users.service';
import { TokensService } from './tokens.service';
import { BcryptService } from './bcrypt.service';
import { AuthService } from './auth.service';
import { PostsService } from './posts.service';
import { PostsRepository } from '../repositories/posts.repository';
import { RolesRepository } from '../repositories/roles.repository';
import { TokensRepository } from '../repositories/tokens.repository';
import { UsersRepository } from '../repositories/users.repository';
import { RepositoriesProviderEnum } from '../enums/repositories-provider.enum';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { CommentsRepository } from 'src/repositories/comments.repository';
import { CommentsService } from './comments.service';

const repositoriesProvider: Provider[] = [
  {
    provide: RepositoriesProviderEnum.PostsRepository,
    useClass: PostsRepository,
  },
  {
    provide: RepositoriesProviderEnum.RolesRepository,
    useClass: RolesRepository,
  },
  {
    provide: RepositoriesProviderEnum.TokensRepository,
    useClass: TokensRepository,
  },
  {
    provide: RepositoriesProviderEnum.UsersRepository,
    useClass: UsersRepository,
  },
  {
    provide: RepositoriesProviderEnum.CommentsRepository,
    useClass: CommentsRepository,
  },
];

@Module({
  imports: [JwtModule.register({}), ConfigModule, DatabaseModule],
  providers: [
    ...repositoriesProvider,
    RolesService,
    UsersService,
    TokensService,
    BcryptService,
    AuthService,
    PostsService,
    CommentsService,
  ],
  exports: [
    RolesService,
    UsersService,
    TokensService,
    BcryptService,
    AuthService,
    PostsService,
    CommentsService,
  ],
})
export class ServicesModule {}
