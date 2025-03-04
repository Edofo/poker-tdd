import { describe, expect, it } from 'vitest';
import { compareHands } from '../poker';

describe('Hand Comparison', () => {
  describe('Successful cases', () => {
    it('should determine that a higher hand type beats a lower one', () => {
      const royalFlush = ['AH', 'KH', 'QH', 'JH', 'TH'];
      const fourOfAKind = ['7H', '7D', '7S', '7C', '9H'];
      expect(compareHands(royalFlush, fourOfAKind)).toBe(1);
      expect(compareHands(fourOfAKind, royalFlush)).toBe(-1);
    });

    it('should break ties in straight flushes by highest card', () => {
      const higherStraightFlush = ['KS', 'QS', 'JS', 'TS', '9S'];
      const lowerStraightFlush = ['9H', '8H', '7H', '6H', '5H'];
      expect(compareHands(higherStraightFlush, lowerStraightFlush)).toBe(1);
    });

    it('should break ties in four of a kind by rank of four cards', () => {
      const higherFourOfKind = ['KH', 'KD', 'KS', 'KC', '2H'];
      const lowerFourOfKind = ['QH', 'QD', 'QS', 'QC', 'AH'];
      expect(compareHands(higherFourOfKind, lowerFourOfKind)).toBe(1);
    });

    it('should break ties in full houses by the three of a kind first', () => {
      const higherFullHouse = ['KH', 'KD', 'KS', '2C', '2H'];
      const lowerFullHouse = ['QH', 'QD', 'QS', 'AC', 'AH'];
      expect(compareHands(higherFullHouse, lowerFullHouse)).toBe(1);
    });

    it('should break ties in flushes by comparing cards in descending order', () => {
      const higherFlush = ['AH', 'QH', '9H', '7H', '5H'];
      const lowerFlush = ['AD', 'QD', '8D', '7D', '5D'];
      expect(compareHands(higherFlush, lowerFlush)).toBe(1);
    });

    it('should break ties in straights by the highest card', () => {
      const higherStraight = ['KH', 'QD', 'JS', 'TC', '9H'];
      const lowerStraight = ['9S', '8H', '7D', '6C', '5S'];
      expect(compareHands(higherStraight, lowerStraight)).toBe(1);
    });

    it('should recognize that A-5-4-3-2 is the lowest straight', () => {
      const highStraight = ['6H', '5D', '4S', '3C', '2H'];
      const lowStraight = ['5S', '4H', '3D', '2C', 'AS'];
      expect(compareHands(highStraight, lowStraight)).toBe(1);
    });

    it('should break ties in three of a kind by the rank of the three cards', () => {
      const higherThreeOfKind = ['KH', 'KD', 'KS', '5C', '3H'];
      const lowerThreeOfKind = ['QH', 'QD', 'QS', 'AC', 'KH'];
      expect(compareHands(higherThreeOfKind, lowerThreeOfKind)).toBe(1);
    });

    it('should break ties in two pairs by the highest pair first, then second pair', () => {
      const higherTwoPair = ['AH', 'AD', 'KS', 'KC', '2H'];
      const lowerTwoPair = ['AH', 'AD', 'QS', 'QC', 'KH'];
      expect(compareHands(higherTwoPair, lowerTwoPair)).toBe(1);
    });

    it('should break ties in two pairs by the kicker if pairs are equal', () => {
      const higherTwoPairKicker = ['AH', 'AD', 'KS', 'KC', 'QH'];
      const lowerTwoPairKicker = ['AC', 'AS', 'KH', 'KD', 'JD'];
      expect(compareHands(higherTwoPairKicker, lowerTwoPairKicker)).toBe(1);
    });

    it('should break ties in pairs by the highest pair', () => {
      const higherPair = ['AH', 'AD', 'KS', 'QC', '2H'];
      const lowerPair = ['KH', 'KD', 'AS', 'QC', 'JH'];
      expect(compareHands(higherPair, lowerPair)).toBe(1);
    });

    it('should break ties in pairs by comparing kickers in descending order', () => {
      const higherPairKicker = ['AH', 'AD', 'KS', 'QC', '2H'];
      const lowerPairKicker = ['AC', 'AS', 'KH', 'JD', '2D'];
      expect(compareHands(higherPairKicker, lowerPairKicker)).toBe(1);
    });

    it('should break ties in high card hands by comparing cards in descending order', () => {
      const higherHighCard = ['AH', 'KD', 'QS', 'JC', '9H'];
      const lowerHighCard = ['AH', 'KD', 'QS', 'TC', '9H'];
      expect(compareHands(higherHighCard, lowerHighCard)).toBe(1);
    });

    it('should identify tied hands as equal', () => {
      const hand1 = ['AH', 'KD', 'QS', 'JC', '9H'];
      const hand2 = ['AC', 'KS', 'QH', 'JD', '9S'];
      expect(compareHands(hand1, hand2)).toBe(0);
    });
  });

  describe('Edge Cases and Invalid Inputs', () => {
    it('should throw error for comparing invalid hands', () => {
      const validHand = ['AH', 'KD', 'QS', 'JC', '9H'];
      const invalidHand = ['AH', 'ZD', 'QS', 'JC', '9H']; // ZD is invalid

      expect(() => compareHands(validHand, invalidHand)).toThrow('Invalid card value');
      expect(() => compareHands(invalidHand, validHand)).toThrow('Invalid card value');
    });

    it('should throw error when comparing hands with different lengths', () => {
      const hand1 = ['AH', 'KD', 'QS', 'JC', '9H'];
      const hand2 = ['AH', 'KD', 'QS', 'JC']; // Only 4 cards

      expect(() => compareHands(hand1, hand2)).toThrow('Hand must contain exactly 5 cards');
    });
  });
});
