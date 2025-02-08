module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  // 👇 This runs before tests, good for loading env vars, etc.
  setupFiles: ['<rootDir>/jest.setup.ts'],

  // 👇 This runs after the test framework is set up, good for matchers
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],

  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/src/__mocks__/fileMock.ts',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/utils/env$': '<rootDir>/src/utils/env.node.ts'
  },
};