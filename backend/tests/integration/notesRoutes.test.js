import { describe, expect, it, jest, beforeEach } from '@jest/globals';
import request from 'supertest';
import app from '../../src/app.js';

// Mock le modèle Note
const mockNotes = [
  { _id: '1', title: 'Note 1', content: 'Contenu 1' },
  { _id: '2', title: 'Note 2', content: 'Contenu 2' }
];

// Mock pour Note model
const NoteMock = {
  find: jest.fn().mockResolvedValue(mockNotes),
  findById: jest.fn().mockImplementation((id) => {
    const note = mockNotes.find(note => note._id === id);
    return Promise.resolve(note);
  }),
  prototype: {
    save: jest.fn().mockResolvedValue(mockNotes[0])
  }
};

// Mock mongoose
jest.mock('mongoose', () => ({
  connect: jest.fn(),
  connection: {
    close: jest.fn()
  },
  Schema: jest.fn().mockImplementation(() => ({
    virtual: jest.fn().mockReturnThis()
  })),
  model: jest.fn().mockReturnValue(NoteMock),
  Types: {
    ObjectId: {
      isValid: jest.fn().mockReturnValue(true)
    }
  }
}));

jest.mock('../../src/models/noteModel.js', () => ({
  default: NoteMock
}));

describe('Notes API Routes Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  describe('GET /api/notes', () => {
    it('devrait retourner toutes les notes', async () => {
      const res = await request(app).get('/api/notes');
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.notes)).toBeTruthy();
    });
  });
});
