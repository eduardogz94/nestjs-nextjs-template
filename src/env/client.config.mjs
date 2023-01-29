import ClientEnvService from './client.service.mjs';

export class ConfigService {
  constructor(envService) {
    this.service = envService;
  }

  get envPort() {
    return Number(this.service.environment.BACKEND_PORT);
  }
}

export default new ConfigService(new ClientEnvService());
