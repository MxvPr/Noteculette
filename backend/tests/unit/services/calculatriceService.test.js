import { describe, expect, it } from '@jest/globals';
import * as calculatriceService from '../../../src/services/calculatriceService.js';

describe('Calculatrice Service Tests', () => {
  describe('addition', () => {
    it('devrait additionner deux nombres', () => {
      expect(calculatriceService.addition(1, 2)).toBe(3);
      expect(calculatriceService.addition(-1, 2)).toBe(1);
      expect(calculatriceService.addition(0, 0)).toBe(0);
    });

    it('devrait gérer les nombres à virgule flottante', () => {
      expect(calculatriceService.addition(1.5, 2.5)).toBe(4);
      expect(calculatriceService.addition(0.1, 0.2)).toBeCloseTo(0.3);
    });
  });

  describe('soustraction', () => {
    it('devrait soustraire deux nombres', () => {
      expect(calculatriceService.soustraction(5, 3)).toBe(2);
      expect(calculatriceService.soustraction(3, 5)).toBe(-2);
      expect(calculatriceService.soustraction(5, 5)).toBe(0);
    });

    it('devrait gérer les nombres à virgule flottante', () => {
      expect(calculatriceService.soustraction(5.5, 3.3)).toBeCloseTo(2.2);
    });
  });

  describe('multiplication', () => {
    it('devrait multiplier deux nombres', () => {
      expect(calculatriceService.multiplication(2, 3)).toBe(6);
      expect(calculatriceService.multiplication(-2, 3)).toBe(-6);
      expect(calculatriceService.multiplication(-2, -3)).toBe(6);
      expect(calculatriceService.multiplication(0, 5)).toBe(0);
    });

    it('devrait gérer les nombres à virgule flottante', () => {
      expect(calculatriceService.multiplication(2.5, 4)).toBe(10);
    });
  });

  describe('division', () => {
    it('devrait diviser deux nombres', () => {
      expect(calculatriceService.division(6, 2)).toBe(3);
      expect(calculatriceService.division(7, 2)).toBe(3.5);
      expect(calculatriceService.division(-6, 2)).toBe(-3);
    });

    it('devrait gérer les cas particuliers', () => {
      expect(() => calculatriceService.division(6, 0)).toThrow('Division par zéro');
    });
  });
});
