import type { Card } from '../types/card';
import { validValues } from './validData';
import { cardValue } from './values';

export const parseCard = (cardStr: string): Card => {
  const cardRegex = /^([2-9TJQKA])([HCDS])$/;
  const match = cardRegex.exec(cardStr);

  if (!match) {
    const cardValue = cardStr.slice(0, -1);
    if (!validValues.includes(cardValue)) {
      throw new Error('Invalid card value');
    }
    throw new Error('Invalid card suit');
  }

  const [, value, suit] = match;

  return {
    value,
    suit,
    numericValue: cardValue[value],
  };
};
