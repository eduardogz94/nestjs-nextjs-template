import Joi from 'joi';
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
    return Joi.object({}).options({ stripUnknown: true });
  }
}
