import { Module } from '@nestjs/common';
import { ServicesModule } from '../services/services.module';
import { AuthController } from './auth.controller';
import { RolesController } from './roles.controller';
import { PostsController } from './posts.controller';

@Module({
  imports: [ServicesModule],
  controllers: [RolesController, AuthController, PostsController],
})
export class ControllersModule {}
