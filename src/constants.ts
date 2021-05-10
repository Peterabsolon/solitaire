export enum RANK {
  ACE = "A",
  TWO = "2",
  THREE = "3",
  FOUR = "4",
  FIVE = "5",
  SIX = "6",
  SEVEN = "7",
  EIGHT = "8",
  NINE = "9",
  TEN = "10",
  JACK = "J",
  QUEEN = "Q",
  KING = "K",
}

export const RANK_VALUES = Object.values(RANK)

export enum SUIT {
  CLUBS = "C",
  DIAMONDS = "D",
  HEARTS = "H",
  SPADES = "S",
}

// These could be defined in a theme for styled-components, but for this demo this should be enough
export const CARD_WIDTH_NUM = 7
export const CARD_WIDTH = `${CARD_WIDTH_NUM}vw`
export const CARD_HEIGHT = `${CARD_WIDTH_NUM * (3 / 2)}vw`
export const BORDER_RADIUS = `${CARD_WIDTH_NUM / 10}vw`
