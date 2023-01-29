import { createdb } from 'pgtools';
import dotenv from 'dotenv';

dotenv.config();
createDatabase();

async function createDatabase() {
  try {
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

    // tslint:disable-next-line: no-console
    console.log('\x1b[96m%s\x1b[0m', '✅ Created database');
  } catch (error) {
    console.log(error);
    throw new Error('❌ Invalid try to create database');
  }
}
