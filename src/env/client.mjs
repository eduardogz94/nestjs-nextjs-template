import { clientSideEnv } from './schema.mjs';

clientSideEnv.service.validateEnv(
  clientSideEnv.service.environment,
  clientSideEnv.service.environmentSchema,
);

for (let key of Object.keys(clientSideEnv.service.environment)) {
  if (!key.startsWith('NEXT_PUBLIC_')) {
    console.warn(
      `❌ Invalid public environment variable name: ${key}. It must begin with 'NEXT_PUBLIC_'`,
    );

    throw new Error('❌ Invalid public environment variable name');
  }
}

export const env = clientSideEnv.service.environment;
