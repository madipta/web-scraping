/* eslint-disable */
export default {
  displayName: "api-public",
  
  globals: {
    "ts-jest": {"tsconfig": "<rootDir>/tsconfig.spec.json"
      
    },
  },
  transform: {
    "^.+\\.[tj]s$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "js", "html"],
  coverageDirectory: "../../../coverage/apps/api/public","testEnvironment": "node","preset": "..\\..\\..\\jest.preset.ts"
};
