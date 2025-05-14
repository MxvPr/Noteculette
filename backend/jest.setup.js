// Utiliser import pour importer jest
import { jest } from '@jest/globals';

// Définir l'environnement de test
process.env.NODE_ENV = 'test';

// Configuration de Jest
jest.setTimeout(30000);

// Désactiver les avertissements de console pendant les tests
global.console = {
  ...console,
  // Garde les erreurs mais désactive les logs et warnings
  log: jest.fn(),
  warn: jest.fn(),
  info: jest.fn()
};
