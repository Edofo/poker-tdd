export const identifyHand = (hand: string[]): string => {
  if (hand.length !== 5) {
    throw new Error('Hand must contain exactly 5 cards');
  }

  const cardRegex = /^([2-9TJQKA])([HCDS])$/;
  const validValues = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
  const validSuits = ['H', 'C', 'D', 'S'];
  
  const valueMap: Record<string, number> = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, 
    'T': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14
  };

  if (new Set(hand).size !== hand.length) {
    throw new Error('Duplicate card in hand');
  }

  const values: string[] = [];
  const suits: string[] = [];
  const numericValues: number[] = [];

  for (const card of hand) {
    const match = card.match(cardRegex);
    if (!match) {
      const cardValue = card.slice(0, -1);
      if (!validValues.includes(cardValue)) {
        throw new Error('Invalid card value');
      }
      const cardSuit = card.slice(-1);
      if (!validSuits.includes(cardSuit)) {
        throw new Error('Invalid card suit');
      }
      throw new Error('Invalid card format');
    }
    
    const [, value, suit] = match;
    
    values.push(value);
    suits.push(suit);
    numericValues.push(valueMap[value]);
  }

  numericValues.sort((a, b) => a - b);

  const valueCounts: Record<number, number> = {};
  for (const value of numericValues) {
    valueCounts[value] = (valueCounts[value] || 0) + 1;
  }

  const isFlush = new Set(suits).size === 1;
  
  let isStraight = false;
  
  if (numericValues[4] - numericValues[0] === 4 && new Set(numericValues).size === 5) {
    isStraight = true;
  }
  
  if (numericValues[0] === 2 && numericValues[1] === 3 && 
      numericValues[2] === 4 && numericValues[3] === 5 && 
      numericValues[4] === 14) { // Ace
    isStraight = true;
  }

  if (isFlush && isStraight && numericValues[0] === 10) {
    return 'Royal Flush';
  }

  if (isFlush && isStraight) {
    return 'Straight Flush';
  }

  if (Object.values(valueCounts).includes(4)) {
    return 'Four of a Kind';
  }

  if (Object.values(valueCounts).includes(3) && Object.values(valueCounts).includes(2)) {
    return 'Full House';
  }

  if (isFlush) {
    return 'Flush';
  }

  if (isStraight) {
    return 'Straight';
  }

  if (Object.values(valueCounts).includes(3)) {
    return 'Three of a Kind';
  }

  const pairs = Object.values(valueCounts).filter(count => count === 2).length;
  if (pairs === 2) {
    return 'Two Pair';
  }

  if (pairs === 1) {
    return 'Pair';
  }

  return 'High Card';
};

export const compareHands = (hand1: string[], hand2: string[]) => {
  throw new Error('Not implemented');
};