import { Module } from '@nestjs/common';
import { ServicesModule } from '../services/services.module';
import { AuthController } from './auth.controller';
import { RolesController } from './role.controller';

@Module({
  imports: [ServicesModule],
  controllers: [RolesController, AuthController],
})
export class ControllersModule {}
