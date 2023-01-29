import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const source = new DataSource({
  type: 'postgres' as const,
  host: process.env.TYPEORM_HOST,
  port: 5432,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: ['src/server/app/**/*.entity.ts'],
  migrations: ['src/server/migration/*.{ts,js}'],
  extra: {
    ssl:
      process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,
  },
});

export default source;
