import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { LocalEnvPathsEnum } from 'src/enums/local-env-paths.enum';
import { Logger } from '@nestjs/common';

const configSwagger = new DocumentBuilder()
  .setTitle('docs blog')
  .setDescription('The blog API documentation')
  .setVersion('1.0')
  .addTag('blog')
  .build();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  const configService = app.get(ConfigService);
  const PORT = configService.get(LocalEnvPathsEnum.APP_PORT);
  const ENV = configService.get(LocalEnvPathsEnum.APP_ENV);
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('/api/v1/docs', app, document);
  await app.listen(PORT, () =>
    Logger.log(` Backend Api started on ${PORT} PORT MODE = ${ENV}`, 'App'),
  );
}

bootstrap();
