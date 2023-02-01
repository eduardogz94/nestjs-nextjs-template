import { z } from 'zod';
import { BaseService } from './base.service.mjs';

export default class ServerEnvService extends BaseService {
  environmentSchema;
  constructor() {
    super('server');
    this.environmentSchema = this.#getEnvSchema();
    this.environment = this.validateEnv(
      this.environment,
      this.environmentSchema,
    );
  }

  #getEnvSchema() {
    return z
      .object({
        TYPEORM_MIGRATIONS: z.string().min(3).max(30),
        TYPEORM_ENTITIES: z.string().min(3).max(30),
        TYPEORM_USERNAME: z.string().min(3).max(30),
        TYPEORM_PASSWORD: z.string().min(4).max(30),
        TYPEORM_PORT: z.string(),
        TYPEORM_HOST: z.string().min(3).max(30),
        TYPEORM_DATABASE: z.string().min(3).max(30),
        JWT_SECRET: z.string().min(3).max(30),
      })
      .strict()
      .strip();
  }
}
