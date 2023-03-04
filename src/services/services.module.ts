import { Module, Provider } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RoleService } from './role.service';
import { UserService } from './user.service';
import { TokenService } from './token.service';
import { BcryptService } from './bcrypt.service';
import { AuthService } from './auth.service';
import { PostService } from './post.service';
import { PostRepository } from '../repositories/post.repository';
import { RoleRepository } from '../repositories/role.repository';
import { TokenRepository } from '../repositories/token.repository';
import { UserRepository } from '../repositories/user.repository';
import { RepositoriesProviderEnum } from '../enums/repositories-provider.enum';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { CommentRepository } from 'src/repositories/comment.repository';
import { CommentService } from './comment.service';

const repositoriesProvider: Provider[] = [
  {
    provide: RepositoriesProviderEnum.PostRepository,
    useClass: PostRepository,
  },
  {
    provide: RepositoriesProviderEnum.RoleRepository,
    useClass: RoleRepository,
  },
  {
    provide: RepositoriesProviderEnum.TokenRepository,
    useClass: TokenRepository,
  },
  {
    provide: RepositoriesProviderEnum.UserRepository,
    useClass: UserRepository,
  },
  {
    provide: RepositoriesProviderEnum.CommentRepository,
    useClass: CommentRepository,
  },
];

@Module({
  imports: [JwtModule.register({}), ConfigModule, DatabaseModule],
  providers: [
    ...repositoriesProvider,
    RoleService,
    UserService,
    TokenService,
    BcryptService,
    AuthService,
    PostService,
    CommentService,
  ],
  exports: [
    RoleService,
    UserService,
    TokenService,
    BcryptService,
    AuthService,
    PostService,
    CommentService,
  ],
})
export class ServicesModule {}
