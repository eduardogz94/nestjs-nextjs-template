import Joi from 'joi';
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
    return Joi.object({
      TYPEORM_MIGRATIONS: Joi.string().min(3).max(30),
      TYPEORM_ENTITIES: Joi.string().min(3).max(30),
      TYPEORM_USERNAME: Joi.string().alphanum().min(3).max(30),
      TYPEORM_PASSWORD: Joi.string().min(4).max(30),
      TYPEORM_PORT: Joi.number(),
      TYPEORM_HOST: Joi.string().alphanum().min(3).max(30),
      TYPEORM_DATABASE: Joi.string().alphanum().min(3).max(30),
      BACKEND_PORT: Joi.number(),
      JWT_SECRET: Joi.string().alphanum().min(3).max(30),
    }).options({ stripUnknown: true });
  }
}
