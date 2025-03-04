import { describe, expect, it } from 'vitest';
import { identifyHand } from '../identifyHand';

describe('Hand Identification', () => {
  describe('Successful cases', () => {
    it('should identify a royal flush', () => {
      const hand = ['AH', 'KH', 'QH', 'JH', 'TH'];
      expect(identifyHand(hand)).toBe('Royal Flush');
    });

    it('should identify a straight flush', () => {
      const hand = ['9S', '8S', '7S', '6S', '5S'];
      expect(identifyHand(hand)).toBe('Straight Flush');
    });

    it('should identify a low straight flush with Ace', () => {
      const hand = ['5C', '4C', '3C', '2C', 'AC'];
      expect(identifyHand(hand)).toBe('Straight Flush');
    });

    it('should identify four of a kind', () => {
      const hand = ['7H', '7D', '7S', '7C', '9H'];
      expect(identifyHand(hand)).toBe('Four of a Kind');
    });

    it('should identify a full house', () => {
      const hand = ['TH', 'TD', 'TS', '4C', '4H'];
      expect(identifyHand(hand)).toBe('Full House');
    });

    it('should identify a flush', () => {
      const hand = ['AC', 'TC', '7C', '6C', '2C'];
      expect(identifyHand(hand)).toBe('Flush');
    });

    it('should identify a straight', () => {
      const hand = ['9H', '8C', '7S', '6D', '5H'];
      expect(identifyHand(hand)).toBe('Straight');
    });

    it('should identify a high straight with Ace', () => {
      const hand = ['AH', 'KD', 'QS', 'JC', 'TD'];
      expect(identifyHand(hand)).toBe('Straight');
    });

    it('should identify a low straight with Ace', () => {
      const hand = ['5H', '4D', '3S', '2C', 'AD'];
      expect(identifyHand(hand)).toBe('Straight');
    });

    it('should identify three of a kind', () => {
      const hand = ['8H', '8D', '8S', 'KC', '3D'];
      expect(identifyHand(hand)).toBe('Three of a Kind');
    });

    it('should identify two pair', () => {
      const hand = ['JH', 'JC', '4S', '4H', 'AD'];
      expect(identifyHand(hand)).toBe('Two Pair');
    });

    it('should identify a pair', () => {
      const hand = ['TH', 'TC', 'KS', '4H', '3D'];
      expect(identifyHand(hand)).toBe('Pair');
    });

    it('should identify high card', () => {
      const hand = ['KH', 'QC', 'JS', '8D', '3H'];
      expect(identifyHand(hand)).toBe('High Card');
    });
  });

  describe('Edge Cases and Invalid Inputs', () => {
    it('should throw error for invalid card format', () => {
      const hand = ['AAH', 'KD', 'QS', 'JC', '9H']; // AAH is not valid, should be AH
      expect(() => identifyHand(hand)).toThrow('Invalid card value');
    });

    it('should throw error for invalid card suit', () => {
      const hand = ['AR', 'KD', 'QS', 'JC', '9H']; // AR is not valid, should be AH
      expect(() => identifyHand(hand)).toThrow('Invalid card suit');
    });

    it('should throw error for non-existent card value', () => {
      const hand = ['ZH', 'KD', 'QS', 'JC', '9H']; // ZH is not a valid card value
      expect(() => identifyHand(hand)).toThrow('Invalid card value');
    });

    it('should throw error for duplicate cards in hand', () => {
      const hand = ['AH', 'AH', 'QS', 'JC', '9H']; // AH appears twice
      expect(() => identifyHand(hand)).toThrow('Duplicate card in hand');
    });

    it('should throw error for hand with fewer than 5 cards', () => {
      const hand = ['AH', 'KD', 'QS', 'JC']; // Only 4 cards
      expect(() => identifyHand(hand)).toThrow('Hand must contain exactly 5 cards');
    });

    it('should throw error for hand with more than 5 cards', () => {
      const hand = ['AH', 'KD', 'QS', 'JC', '9H', '8D']; // 6 cards
      expect(() => identifyHand(hand)).toThrow('Hand must contain exactly 5 cards');
    });

    it('should throw error for empty hand', () => {
      const hand: string[] = [];
      expect(() => identifyHand(hand)).toThrow('Hand must contain exactly 5 cards');
    });
  });
});
