module.exports = {
  displayName: "api-public",
  preset: "../../../jest.preset.js",
  globals: {
    "ts-jest": {"tsconfig": "<rootDir>/tsconfig.spec.json"
      
    },
  },
  transform: {
    "^.+\\.[tj]s$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "js", "html"],
  coverageDirectory: "../../../coverage/apps/api/public","testEnvironment": "node"
};
