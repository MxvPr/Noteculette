import { describe, expect, it, jest, afterEach } from '@jest/globals';
import { addition, soustraction, multiplication, division } from '../../../src/controllers/calculatriceController.js';

// Mock pour calculatriceService (import direct car nous ne pouvons pas facilement mocker les modules ES)
const calculatriceService = {
  addition: jest.fn(),
  soustraction: jest.fn(),
  multiplication: jest.fn(),
  division: jest.fn()
};

// Injection du mock dans le scope global pour être accessible aux contrôleurs
global.calculatriceService = calculatriceService;

// Mock pour req et res
const mockRequest = (body = {}) => ({
  body
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Calculatrice Controller Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  describe('addition', () => {
    it('devrait effectuer une addition et retourner 200', async () => {
      calculatriceService.addition.mockReturnValue(8);
      
      const req = mockRequest({ a: 5, b: 3 });
      const res = mockResponse();
      
      // Appeler directement la fonction du contrôleur
      await addition(req, res);
      
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        success: true,
        result: 8
      }));
    });

    it('devrait retourner 400 pour des paramètres manquants', async () => {
      const req = mockRequest({ a: 5 }); // b manquant
      const res = mockResponse();
      
      await addition(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        success: false
      }));
    });
  });
});
