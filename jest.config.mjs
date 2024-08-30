export default {
  transform: {},
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'jsx', 'mjs', 'ts', 'tsx', 'json', 'node'],
  transformIgnorePatterns: ['/node_modules/'],
  testMatch: ['**/__tests__/**/*.mjs'],
  moduleDirectories: ['node_modules', '<rootDir>'], 
  globals: {
    'babel-jest': {
      useESM: true,
    },
  },
};
