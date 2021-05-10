import { makeAutoObservable } from "mobx"
import { DragEvent } from "react"

import { RANK, SUIT } from "./Card.constants"

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
  turn = () => {
    this.isTurned = !this.isTurned
  }

  handleDragStart = (event: DragEvent<any>) => {
    // @ts-ignore
    const data = event.target.id

    console.log("data", data)

    event.dataTransfer.setData("text", data)
  }
}
