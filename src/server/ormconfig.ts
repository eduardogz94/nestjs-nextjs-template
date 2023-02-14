import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

const source = new DataSource({
  type: 'postgres' as const,
  host: process.env.TYPEORM_HOST,
  port: 5432,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: ['./code/app/**/*.entity.ts'],
  migrations: ['./migration/*.{ts,js}'],
  extra: {
    ssl:
      process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,
  },
});

export default source;
