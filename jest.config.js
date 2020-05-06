module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  testMatch: [
    "**/test/**/*.test.js"
  ],
  testTimeout: 5000,
  moduleDirectories: [
    "node_modules"
  ],
  coverageDirectory: "./coverage/",
  collectCoverage: true
};