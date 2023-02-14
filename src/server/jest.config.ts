import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  moduleFileExtensions: ['js', 'ts'],
  modulePaths: ['./'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['./code/**/*.ts'],
  coveragePathIgnorePatterns: [
    './console',
    './migration',
    './coverage',
    './dist',
  ],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
};

export default config;
