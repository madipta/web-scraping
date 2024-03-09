import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run public:serve',
        production: 'nx run public:preview',
      },
      ciWebServerCommand: 'nx run public:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
