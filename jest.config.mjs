import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config = {
  clearMocks: true,
  collectCoverageFrom: [
    "templates/**/*.{ts,tsx}",
    "utils/**/*.{ts,tsx}",
    "!**/*.stories.{ts,tsx}",
    "!**/*Skeleton.{ts,tsx}",
  ],
  coverageProvider: "v8",
  coverageReporters: ["text", "lcov"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.mjs"],
  testEnvironment: "jsdom",
};

export default createJestConfig(config);
