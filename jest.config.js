export default {
  testMatch: ["**/*.test.js"],
  transform: {
    "^.+\\.m?js$": "babel-jest",
  },
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
};
