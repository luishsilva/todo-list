module.exports = {
  testMatch: ["**/tests/**/*.test.js", "**/tests/**/*.spec.js"],
  testEnvironment: "node",
  setupFilesAfterEnv: ["./tests/setup.js"], // Updated path
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/config/"],
};
