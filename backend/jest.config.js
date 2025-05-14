export default {
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/config/*.js',
    '!**/node_modules/**'
  ],
  coverageDirectory: 'coverage',
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
  testPathIgnorePatterns: [
    '/node_modules/',
    'tests/unit/models/noteModel.test.js',
    'tests/integration/notesRoutes.test.js'
  ],
  setupFilesAfterEnv: ['./jest.setup.js'],
  
  // Configuration pour ignorer les fichiers problématiques
  transformIgnorePatterns: [
    "node_modules/(?!(mongodb-memory-server|mongodb-memory-server-core)/)"
  ],
  
  // Autres options
  transform: {},
  moduleDirectories: ['node_modules', 'src']
};
