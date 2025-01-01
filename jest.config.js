export default {
  testEnvironment: "node",
  verbose: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  // Add support for ES modules
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  moduleFileExtensions: ["js"],
  // Enable ES modules
  type: "module",
};
