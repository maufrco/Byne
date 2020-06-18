module.exports = {
  preset: "ts-jest",
  // Stop running tests after `n` failures
  bail: true,
  // The directory where Jest should output its coverage files
  coverageDirectory: "__tests__/coverage",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.js?(x)"],
};
