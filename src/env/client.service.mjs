import { z } from 'zod';
import { BaseService } from './base.service.mjs';

export default class ClientEnvService extends BaseService {
  environmentSchema;
  constructor() {
    super('frontend');
    this.environmentSchema = this.#getEnvSchema();
    this.environment = this.validateEnv(
      this.environment,
      this.environmentSchema,
    );
  }

  #getEnvSchema() {
    return z.object({
      NEXT_PUBLIC_BACKEND_PORT: z.string(),
    });
  }
}
