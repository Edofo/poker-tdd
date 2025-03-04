import type { Card } from './types/card';
import { parseCard } from './utils/parseCard';

const isStraight = (cards: Card[]): boolean => {
  const sortedValues = [...cards].sort((a, b) => a.numericValue - b.numericValue);

  if (
    sortedValues[4].numericValue - sortedValues[0].numericValue === 4 &&
    new Set(sortedValues.map((card) => card.numericValue)).size === 5
  ) {
    return true;
  }

  if (
    sortedValues[0].numericValue === 2 &&
    sortedValues[1].numericValue === 3 &&
    sortedValues[2].numericValue === 4 &&
    sortedValues[3].numericValue === 5 &&
    sortedValues[4].numericValue === 14
  ) {
    // Ace
    return true;
  }

  return false;
};

const getValueCounts = (cards: Card[]): Record<number, number> => {
  const valueCounts: Record<number, number> = {};

  for (const card of cards) {
    valueCounts[card.numericValue] = (valueCounts[card.numericValue] || 0) + 1;
  }

  return valueCounts;
};

export const identifyHand = (hand: string[]): string => {
  if (hand.length !== 5) {
    throw new Error('Hand must contain exactly 5 cards');
  }

  if (new Set(hand).size !== hand.length) {
    throw new Error('Duplicate card in hand');
  }

  const cards = hand.map(parseCard);

  const sortedCards = [...cards].sort((a, b) => a.numericValue - b.numericValue);

  const hasFlush = new Set(cards.map((card) => card.suit)).size === 1;
  const hasStraight = isStraight(cards);

  const valueCounts = getValueCounts(cards);
  const counts = Object.values(valueCounts);

  if (hasFlush && hasStraight && sortedCards[0].numericValue === 10) {
    return 'Royal Flush';
  }

  if (hasFlush && hasStraight) return 'Straight Flush';

  if (counts.includes(4)) return 'Four of a Kind';

  if (counts.includes(3) && counts.includes(2)) return 'Full House';

  if (hasFlush) return 'Flush';
  if (hasStraight) return 'Straight';

  if (counts.includes(3)) return 'Three of a Kind';

  if (counts.filter((count) => count === 2).length === 2) {
    return 'Two Pair';
  }

  if (counts.includes(2)) return 'Pair';

  return 'High Card';
};
