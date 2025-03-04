import type { Card } from '../types/card';
import { cardValue } from './values';
import { validSuits, validValues } from './validData';

export const parseCard = (cardStr: string): Card => {
  const cardRegex = /^([2-9TJQKA])([HCDS])$/;
  const match = cardRegex.exec(cardStr);

  if (!match) {
    const cardValue = cardStr.slice(0, -1);
    if (!validValues.includes(cardValue)) {
      throw new Error('Invalid card value');
    }
    const cardSuit = cardStr.slice(-1);
    if (!validSuits.includes(cardSuit)) {
      throw new Error('Invalid card suit');
    }
    throw new Error('Invalid card format');
  }

  const [, value, suit] = match;

  return {
    value,
    suit,
    numericValue: cardValue[value],
  };
};
