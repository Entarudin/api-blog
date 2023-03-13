import { Module } from '@nestjs/common';
import { ServicesModule } from '../services/services.module';
import { AuthController } from './auth.controller';
import { RolesController } from './role.controller';
import { PostsController } from './post.controller';

@Module({
  imports: [ServicesModule],
  controllers: [RolesController, AuthController, PostsController],
})
export class ControllersModule {}
