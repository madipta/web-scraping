export default {
  displayName: "api-admin",
  
  globals: {
    "ts-jest": {"tsconfig": "<rootDir>/tsconfig.spec.json"
      
    },
  },
  transform: {
    "^.+\\.[tj]s$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "js", "html"],
  coverageDirectory: "../../../coverage/apps/api/admin","testEnvironment": "node","preset": "..\\..\\..\\jest.preset.ts"
};
