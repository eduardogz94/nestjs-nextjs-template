/**
 * This file is included in `/next.config.mjs` which ensures the app isn't built with invalid env vars.
 * It has to be a `.mjs`-file to be imported there.
 */
import { serverSideEnv } from './schema.mjs';
import { env as clientEnv } from './client.mjs';

serverSideEnv.service.validateEnv(
  serverSideEnv.service.environment,
  serverSideEnv.service.environmentSchema,
);

for (let key of Object.keys(serverSideEnv.service.environment)) {
  if (key.startsWith('NEXT_PUBLIC_')) {
    console.warn('❌ You are exposing a server-side env-variable:', key);
    throw new Error('❌ You are exposing a server-side env-variable');
  }
}

export const env = { ...serverSideEnv.service.environment, ...clientEnv };
