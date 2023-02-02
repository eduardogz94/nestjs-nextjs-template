import dotenv from 'dotenv';
import path from 'path';
import 'reflect-metadata';
import { fileURLToPath } from 'url';

dotenv.config();

export class BaseService {
  environment;
  #filename = fileURLToPath(import.meta.url);
  #dirname = path.dirname(this.#filename);

  constructor(type) {
    this.type = type;
    this.environment = this.#getEnvironmentFile();
  }

  #getParsedDotEnvFile = (path) => {
    const { error, parsed } = dotenv.config({
      path: `${this.#dirname}/../../${path}`,
    });

    if (error) {
      throw new Error(`❌ Error parsing file: /${path}`);
    }

    return parsed;
  };

  #getEnvironmentFile() {
    try {
      switch (process.env.NODE_ENV) {
        case 'production':
          return this.#getParsedDotEnvFile('.env');
        case 'development':
          return this.#getParsedDotEnvFile('.env.development');
        case 'test':
          return this.#getParsedDotEnvFile('.env.test');
        default:
          return this.#getParsedDotEnvFile('.env');
      }
    } catch (error) {
      throw new Error(
        `❌ No environment ${process.env.NODE_ENV} file found or error parsing it. Please create one in the root of the project. Error: ${error}`,
      );
    }
  }

  validateEnv(config, schema) {
    try {
      const validatedSchema = schema.parse(config);
      console.log(
        '\x1b[96m%s\x1b[0m',
        `✅ Valid environment ${this.type} variables`,
      );

      return validatedSchema;
    } catch (error) {
      throw new Error(
        `❌ Invalid environment ${this.type} variables: ${error.message}`,
      );
    }
  }
}
