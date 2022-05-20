module.exports = {
  roots: [],
  testEnvironment: "noeud-jsdom",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
};
