import { makeAutoObservable } from "mobx"

import { Rank, Suit } from "./Card.constants"

export interface CardModelProps {
  rank: Rank
  suit: Suit
  isTurned?: boolean
}

export class CardModel {
  // ====================================================
  // Model
  // ====================================================
  rank: Rank
  suit: Suit
  isTurned: boolean

  constructor({ rank, suit, isTurned = true }: CardModelProps) {
    makeAutoObservable(this)

    this.rank = rank
    this.suit = suit
    this.isTurned = isTurned
  }

  // ====================================================
  // Computed
  // ====================================================
  get key() {
    return `${this.rank}-${this.suit}`
  }

  get isBlack() {
    return [Suit.Clubs, Suit.Spades].includes(this.suit)
  }

  get isWhite() {
    return !this.isBlack
  }

  // ====================================================
  // Actions
  // ====================================================
  turn = () => {
    this.isTurned = !this.isTurned
  }
}
