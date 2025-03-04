import { describe, expect, it } from 'vitest';
import { identifyHand, compareHands } from './poker';

describe('Poker Hand Evaluator', () => {
  describe('Hand Identification', () => {
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

  describe('Hand Comparison', () => {
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
}); 
