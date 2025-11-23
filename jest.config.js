const esModules = [].join('|');

module.exports = {
  rootDir : './src',
  transformIgnorePatterns: [`<rootDir>/node_modules/(?!${esModules})`],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        allowSyntheticDefaultImports: true,
      },
    ],
    '^.+\\.js$': 'babel-jest',
  },
  setupFilesAfterEnv: [
    '<rootDir>/setup-jest.ts'
  ]
};
