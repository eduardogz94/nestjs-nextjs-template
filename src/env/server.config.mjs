import ServerEnvService from './server.service.mjs';

export class ConfigService {
  constructor(envService) {
    this.service = envService;
  }

  get migrations() {
    return this.service.environment.TYPEORM_MIGRATIONS;
  }

  get dbEntities() {
    return this.service.environment.TYPEORM_ENTITIES;
  }

  get dbUsername() {
    return this.service.environment.TYPEORM_USERNAME;
  }

  get dbPassword() {
    return this.service.environment.TYPEORM_PASSWORD;
  }

  get dbPort() {
    return parseInt(this.service.environment.TYPEORM_PORT, 10);
  }

  get dbHost() {
    return this.service.environment.TYPEORM_HOST;
  }

  get dbName() {
    return this.service.environment.TYPEORM_DATABASE;
  }

  get jwtKey() {
    return this.service.environment.JWT_SECRET;
  }

  get envPort() {
    return Number(this.service.environment.BACKEND_PORT);
  }
}

export default new ConfigService(new ServerEnvService());
