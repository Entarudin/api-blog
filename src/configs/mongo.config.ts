import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';
import { LocalEnvPathsEnum } from '../enums/local-env-paths.enum';

export const getMongoConfig = async (
  configService: ConfigService,
): Promise<TypegooseModuleOptions> => {
  return {
    uri: getMongoString(configService),
    ...getMongoOptions(),
  };
};

const getMongoString = (configService: ConfigService) => {
  const scheme = configService.get(LocalEnvPathsEnum.MONGO_SCHEME);
  const username = configService.get(LocalEnvPathsEnum.MONGO_USERNAME);
  const password = configService.get(LocalEnvPathsEnum.MONGO_PASSWORD);
  const host = configService.get(LocalEnvPathsEnum.MONGO_HOST);
  const port = configService.get(LocalEnvPathsEnum.MONGO_PORT);
  const name = configService.get(LocalEnvPathsEnum.MONGO_NAME);
  const url = `${scheme}://${username}:${password}@${host}:${port}/${name}?authSource=admin`;
  return url;
};

const getMongoOptions = () => ({
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
