import { makeAutoObservable } from "mobx"

import { Rank, RankLabel, Suit } from "./Card.constants"

export interface CardModelProps {
  rank: Rank
  suit: Suit
}

export class CardModel {
  rank: Rank
  suit: Suit

  constructor({ rank, suit }: CardModelProps) {
    makeAutoObservable(this)

    this.rank = rank
    this.suit = suit
  }

  get isBlack() {
    return [Suit.Clubs, Suit.Spades].includes(this.suit)
  }

  get isWhite() {
    return !this.isBlack
  }

  get label() {
    return RankLabel[this.rank]
  }
}
