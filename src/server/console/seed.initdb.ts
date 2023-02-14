import dotenv from 'dotenv';
import { createdb } from 'pgtools';

dotenv.config();
createDatabase();

async function createDatabase() {
  try {
    // eslint-disable-next-line no-console
    console.log('\x1b[96m%s\x1b[0m', 'Attempting to create database');

    await createdb(
      {
        user: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        port: process.env.TYPEORM_PORT,
        host: process.env.TYPEORM_HOST,
      },
      process.env.TYPEORM_DATABASE,
    );

    // eslint-disable-next-line no-console
    console.log('\x1b[96m%s\x1b[0m', '✅ Created database');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    throw new Error('❌ Invalid try to create database');
  }
}
