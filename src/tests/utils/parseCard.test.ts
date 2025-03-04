import { describe, expect, it } from 'vitest';
import { parseCard } from '../../utils/parseCard';
import { cardValue } from '../../utils/values';

describe('parseCard', () => {
  describe('Successful parsing', () => {
    it('should parse a number card correctly', () => {
      const card = parseCard('7H');
      expect(card).toEqual({
        value: '7',
        suit: 'H',
        numericValue: cardValue['7'],
      });
    });

    it('should parse a face card correctly', () => {
      const card = parseCard('KD');
      expect(card).toEqual({
        value: 'K',
        suit: 'D',
        numericValue: cardValue.K,
      });
    });

    it('should parse an Ace correctly', () => {
      const card = parseCard('AS');
      expect(card).toEqual({
        value: 'A',
        suit: 'S',
        numericValue: cardValue.A,
      });
    });

    it('should parse a ten (T) correctly', () => {
      const card = parseCard('TC');
      expect(card).toEqual({
        value: 'T',
        suit: 'C',
        numericValue: cardValue.T,
      });
    });

    it('should parse cards of all suits', () => {
      const hearts = parseCard('2H');
      const diamonds = parseCard('2D');
      const clubs = parseCard('2C');
      const spades = parseCard('2S');

      expect(hearts.suit).toBe('H');
      expect(diamonds.suit).toBe('D');
      expect(clubs.suit).toBe('C');
      expect(spades.suit).toBe('S');
    });

    it('should parse cards of all values', () => {
      const values = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
      for (const value of values) {
        const card = parseCard(`${value}H`);
        expect(card.value).toBe(value);
        expect(card.numericValue).toBe(cardValue[value]);
      }
    });
  });

  describe('Error handling', () => {
    it('should throw error for invalid card format with more than 2 characters', () => {
      expect(() => parseCard('10H')).toThrow('Invalid card value');
    });

    it('should throw error for invalid card format with fewer than 2 characters', () => {
      expect(() => parseCard('A')).toThrow('Invalid card value');
    });

    it('should throw error for invalid card value', () => {
      expect(() => parseCard('1H')).toThrow('Invalid card value');
      expect(() => parseCard('ZH')).toThrow('Invalid card value');
      expect(() => parseCard('0H')).toThrow('Invalid card value');
    });

    it('should throw error for invalid card suit', () => {
      expect(() => parseCard('AX')).toThrow('Invalid card suit');
      expect(() => parseCard('A1')).toThrow('Invalid card suit');
      expect(() => parseCard('AP')).toThrow('Invalid card suit');
    });

    it('should throw error for lowercase card value', () => {
      expect(() => parseCard('aH')).toThrow('Invalid card value');
      expect(() => parseCard('kD')).toThrow('Invalid card value');
    });

    it('should throw error for lowercase card suit', () => {
      expect(() => parseCard('Ah')).toThrow('Invalid card suit');
      expect(() => parseCard('Ks')).toThrow('Invalid card suit');
    });

    it('should throw error for symbols in card value', () => {
      expect(() => parseCard('$H')).toThrow('Invalid card value');
    });

    it('should throw error for special characters', () => {
      expect(() => parseCard('@#')).toThrow('Invalid card value');
    });

    it('should throw error for empty string', () => {
      expect(() => parseCard('')).toThrow('Invalid card value');
    });
  });
});
