import { describe, expect, it } from '@jest/globals';
import request from 'supertest';
import app from '../../src/app.js';

describe('Calculatrice API Routes Tests', () => {
  describe('POST /api/calculatrice/addition', () => {
    it('devrait additionner deux nombres correctement', async () => {
      const res = await request(app)
        .post('/api/calculatrice/addition')
        .send({ a: 5, b: 3 });
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        success: true,
        result: 8
      });
    });

    it('devrait gérer les nombres négatifs', async () => {
      const res = await request(app)
        .post('/api/calculatrice/addition')
        .send({ a: -5, b: 3 });
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        success: true,
        result: -2
      });
    });

    it('devrait retourner une erreur pour des paramètres manquants', async () => {
      const res = await request(app)
        .post('/api/calculatrice/addition')
        .send({ a: 5 });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('POST /api/calculatrice/soustraction', () => {
    it('devrait soustraire deux nombres correctement', async () => {
      const res = await request(app)
        .post('/api/calculatrice/soustraction')
        .send({ a: 10, b: 4 });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.result).toBe(6);
    });
  });

  describe('POST /api/calculatrice/multiplication', () => {
    it('devrait multiplier deux nombres correctement', async () => {
      const res = await request(app)
        .post('/api/calculatrice/multiplication')
        .send({ a: 7, b: 6 });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.result).toBe(42);
    });
  });

  describe('POST /api/calculatrice/division', () => {
    it('devrait diviser deux nombres correctement', async () => {
      const res = await request(app)
        .post('/api/calculatrice/division')
        .send({ a: 20, b: 4 });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.result).toBe(5);
    });

    it('devrait gérer la division avec des nombres à virgule', async () => {
      const res = await request(app)
        .post('/api/calculatrice/division')
        .send({ a: 10, b: 3 });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.result).toBeCloseTo(3.333, 2);
    });

    it('devrait retourner une erreur pour une division par zéro', async () => {
      const res = await request(app)
        .post('/api/calculatrice/division')
        .send({ a: 10, b: 0 });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('division par zéro');
    });
  });
});
