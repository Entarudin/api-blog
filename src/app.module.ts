import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ControllersModule } from './controllers/controllers.module';
import { ServicesModule } from './services/services.module';
import { FiltersModule } from './fillters/fillters.module';

@Module({
  imports: [
    DatabaseModule,
    ControllersModule,
    ServicesModule,
    FiltersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
