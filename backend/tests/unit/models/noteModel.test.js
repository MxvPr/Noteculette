import { describe, expect, it, jest } from '@jest/globals';

// Mock pour mongoose
const mongoose = {
  Schema: function(definition) {
    this.definition = definition;
    this.validate = (data) => {
      // Validation simplifiée
      if (this.definition.title.required && !data.title) {
        throw new Error('Le titre est requis');
      }
      return true;
    };
  },
  model: function(modelName, schema) {
    return function(data) {
      this.data = data;
      this.validateSync = () => {
        if (schema.validate) {
          return schema.validate(data);
        }
      };
    };
  }
};

// Mock le module mongoose
jest.mock('mongoose', () => mongoose);

// Import modèle après le mock pour qu'il utilise la version mockée de mongoose
import Note from '../../../src/models/noteModel.js';

// Tests simplifiés sans utiliser de base de données
describe('Note Model Test', () => {
  it('devrait être défini', () => {
    expect(Note).toBeDefined();
  });
  
  it('devrait permettre de créer une instance', () => {
    const noteData = {
      title: 'Test Note',
      content: 'Contenu du test'
    };
    
    const note = new Note(noteData);
    expect(note).toBeDefined();
    expect(note.data).toEqual(noteData);
  });
});
