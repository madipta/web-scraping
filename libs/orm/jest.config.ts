module.exports = {
  displayName: 'orm',
  
  globals: {
    'ts-jest': {"tsconfig": "<rootDir>/tsconfig.spec.json"
      
    }
  },
  transform: {
    '^.+\\.[tj]sx?$':  'ts-jest' 
  },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/orm',"preset": "..\\..\\jest.preset.ts"
};
