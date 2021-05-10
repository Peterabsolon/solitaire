import { makeAutoObservable } from "mobx"

import { RANK, SUIT } from "../constants"

export interface CardModelProps {
  rank: RANK
  suit: SUIT
  isTurned?: boolean
}

export class CardModel {
  // ====================================================
  // Model
  // ====================================================
  rank: RANK
  suit: SUIT
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
    return [SUIT.CLUBS, SUIT.SPADES].includes(this.suit)
  }

  // ====================================================
  // Actions
  // ====================================================
  reveal = () => {
    this.isTurned = true
  }

  hide = () => {
    this.isTurned = false
  }
}
