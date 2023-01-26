import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { getMongoConfig } from '../configs/mongo.config';
import { PostModel } from 'src/models/postModel';
import { RoleModel } from 'src/models/roleModel';
import { UserModel } from 'src/models/userModel';
import { CommentModel } from 'src/models/commentModel';
import { TokenPairModel } from 'src/models/tokenPairModel';

@Module({
  imports: [
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),
    TypegooseModule.forFeature([
      {
        typegooseClass: PostModel,
        schemaOptions: {
          collection: 'posts',
        },
      },
      {
        typegooseClass: RoleModel,
        schemaOptions: {
          collection: 'roles',
        },
      },
      {
        typegooseClass: UserModel,
        schemaOptions: {
          collection: 'users',
        },
      },
      {
        typegooseClass: TokenPairModel,
        schemaOptions: {
          collection: 'tokens',
        },
      },
      {
        typegooseClass: CommentModel,
        schemaOptions: {
          collection: 'comments',
        },
      },
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [TypegooseModule],
})
export class DatabaseModule {}
