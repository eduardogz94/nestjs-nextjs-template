/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  coverageReporters: ["clover", "json", "lcov", ["text", { skipFull: true }]],
  moduleNameMapper: {
    "\\.(css|less|scss|tsx)$": "./__mocks__/styleMock.js",
    "\\.(gif|ttf|eot|svg)$": "./__mocks__/fileMock.js",
  },
};
