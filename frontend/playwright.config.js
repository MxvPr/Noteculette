import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000, // Augmenté à 60 secondes
  expect: {
    timeout: 15000 // Augmenté à 15 secondes
  },
  fullyParallel: false, // Exécution séquentielle pour éviter les conflits
  retries: 1, // Essayer une seconde fois en cas d'échec
  workers: 1, // Un seul worker
  reporter: [
    ['html'],
    ['line']
  ], // Format correct pour les reporters
  use: {
    baseURL: 'http://localhost:3000',
    actionTimeout: 30000, // Augmenté à 30 secondes
    trace: 'on', // Toujours générer une trace
    video: 'on', // Toujours enregistrer une vidéo
    screenshot: 'on', // Prendre des captures d'écran
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Commenté pour simplifier les tests initiaux
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
  webServer: {
    command: 'npm run start',
    port: 3000,
    reuseExistingServer: true,
    timeout: 120000, // 2 minutes pour démarrer le serveur
  },
});
