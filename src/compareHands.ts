import { identifyHand } from './identifyHand';
import type { Card, Hand } from './types/card';
import { parseCard } from './utils/parseCard';
import { ranksValue } from './utils/values';

const groupByValue = (cards: Card[]): Record<number, Card[]> => {
  const groups: Record<number, Card[]> = {};
  for (const card of cards) {
    if (!groups[card.numericValue]) {
      groups[card.numericValue] = [];
    }
    groups[card.numericValue].push(card);
  }
  return groups;
};

const sortByFrequencyThenValue = (cards: Card[]): Card[] => {
  const groups = groupByValue(cards);

  const sortedGroups = Object.entries(groups)
    .sort(([val1, group1], [val2, group2]) => {
      const sizeDiff = group2.length - group1.length;
      if (sizeDiff !== 0) return sizeDiff;

      return Number(val2) - Number(val1);
    })
    .flatMap(([_, group]) => group);

  return sortedGroups;
};

const compareStraights = (hand1: Hand, hand2: Hand): number => {
  const h1HasLowStraight =
    hand1.some((c) => c.numericValue === 14) && hand1.some((c) => c.numericValue === 2);
  const h2HasLowStraight =
    hand2.some((c) => c.numericValue === 14) && hand2.some((c) => c.numericValue === 2);

  if (h1HasLowStraight && !h2HasLowStraight) return -1;
  if (!h1HasLowStraight && h2HasLowStraight) return 1;
  if (h1HasLowStraight && h2HasLowStraight) return 0;

  const h1High = Math.max(...hand1.map((c) => c.numericValue));
  const h2High = Math.max(...hand2.map((c) => c.numericValue));
  return h1High - h2High;
};

const compareFourOfAKind = (hand1: Card[], hand2: Card[]): number => {
  const h1Groups = groupByValue(hand1);
  const h2Groups = groupByValue(hand2);

  const h1QuadValue = Number(
    Object.entries(h1Groups).find(([_, group]) => group.length === 4)?.[0]
  );
  const h2QuadValue = Number(
    Object.entries(h2Groups).find(([_, group]) => group.length === 4)?.[0]
  );

  return h1QuadValue - h2QuadValue;
};

const compareFullHouse = (hand1: Card[], hand2: Card[]): number => {
  const h1Groups = groupByValue(hand1);
  const h2Groups = groupByValue(hand2);

  const h1TripValue = Number(
    Object.entries(h1Groups).find(([_, group]) => group.length === 3)?.[0]
  );
  const h2TripValue = Number(
    Object.entries(h2Groups).find(([_, group]) => group.length === 3)?.[0]
  );

  if (h1TripValue !== h2TripValue) return h1TripValue - h2TripValue;

  const h1PairValue = Number(
    Object.entries(h1Groups).find(([_, group]) => group.length === 2)?.[0]
  );
  const h2PairValue = Number(
    Object.entries(h2Groups).find(([_, group]) => group.length === 2)?.[0]
  );

  return h1PairValue - h2PairValue;
};

const compareHighCard = (hand1: Card[], hand2: Card[]): number => {
  const h1Sorted = [...hand1].sort((a, b) => b.numericValue - a.numericValue);
  const h2Sorted = [...hand2].sort((a, b) => b.numericValue - a.numericValue);

  for (let i = 0; i < h1Sorted.length; i++) {
    const diff = h1Sorted[i].numericValue - h2Sorted[i].numericValue;
    if (diff !== 0) return diff;
  }
  return 0;
};

const compareThreeOfAKind = (hand1: Card[], hand2: Card[]): number => {
  const h1Sorted = sortByFrequencyThenValue(hand1);
  const h2Sorted = sortByFrequencyThenValue(hand2);

  const diff = h1Sorted[0].numericValue - h2Sorted[0].numericValue;
  if (diff !== 0) return diff;

  for (let i = 3; i < 5; i++) {
    const diff = h1Sorted[i].numericValue - h2Sorted[i].numericValue;
    if (diff !== 0) return diff;
  }
  return 0;
};

const compareTwoPair = (hand1: Card[], hand2: Card[]): number => {
  const h1Sorted = sortByFrequencyThenValue(hand1);
  const h2Sorted = sortByFrequencyThenValue(hand2);

  let diff = h1Sorted[0].numericValue - h2Sorted[0].numericValue;
  if (diff !== 0) return diff;

  diff = h1Sorted[2].numericValue - h2Sorted[2].numericValue;
  if (diff !== 0) return diff;

  return h1Sorted[4].numericValue - h2Sorted[4].numericValue;
};

const comparePair = (hand1: Card[], hand2: Card[]): number => {
  const h1Sorted = sortByFrequencyThenValue(hand1);
  const h2Sorted = sortByFrequencyThenValue(hand2);

  let diff = h1Sorted[0].numericValue - h2Sorted[0].numericValue;
  if (diff !== 0) return diff;

  for (let i = 2; i < 5; i++) {
    diff = h1Sorted[i].numericValue - h2Sorted[i].numericValue;
    if (diff !== 0) return diff;
  }
  return 0;
};

const compareEqualHandTypes = (hand1: Card[], hand2: Card[], handType: string): number => {
  switch (handType) {
    case 'Royal Flush':
      return 0;

    case 'Straight Flush':
    case 'Straight':
      return compareStraights(hand1, hand2);

    case 'Four of a Kind':
      return compareFourOfAKind(hand1, hand2);

    case 'Full House':
      return compareFullHouse(hand1, hand2);

    case 'Flush':
    case 'High Card':
      return compareHighCard(hand1, hand2);

    case 'Three of a Kind':
      return compareThreeOfAKind(hand1, hand2);

    case 'Two Pair':
      return compareTwoPair(hand1, hand2);

    case 'Pair':
      return comparePair(hand1, hand2);

    default:
      return 0;
  }
};

export const compareHands = (hand1: string[], hand2: string[]): number => {
  const hand1Type = identifyHand(hand1);
  const hand2Type = identifyHand(hand2);

  const hand1Rank = ranksValue[hand1Type];
  const hand2Rank = ranksValue[hand2Type];

  if (hand1Rank > hand2Rank) return 1;
  if (hand1Rank < hand2Rank) return -1;

  const cards1 = hand1.map(parseCard);
  const cards2 = hand2.map(parseCard);

  const result = compareEqualHandTypes(cards1, cards2, hand1Type);

  if (result > 0) return 1;
  if (result < 0) return -1;
  return 0;
};
