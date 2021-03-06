module.exports = {
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts', '!src/**/*.factory.ts'],
  coverageReporters: ['html', 'json', 'text'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
