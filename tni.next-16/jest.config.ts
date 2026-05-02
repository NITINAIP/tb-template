import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.tsx"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.css$": "identity-obj-proxy",
    "@fontsource/kanit(.*)": "<rootDir>/__mocks__/empty.ts",
    "^@mui/icons-material/(.*)": "<rootDir>/__mocks__/empty.ts",
  },
  transformIgnorePatterns: ["/node_modules/(?!(redux|@reduxjs/toolkit)/)"],
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "**/*.test.{js,jsx,ts,tsx}",
    "!**/.next/**",
  ],
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: ["text", "lcov"],
  coveragePathIgnorePatterns: ["./jest.config.ts"],
};

export default createJestConfig(customJestConfig);
