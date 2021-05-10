import { makeAutoObservable } from "mobx"

import { CardModel } from "../Card"
import { PileModel } from "../Pile"
import { RANK, SUIT } from "../constants"

export class DeckModel {
  // ====================================================
  // Model
  // ====================================================
  pile = new PileModel()
  pileTurned = new PileModel()

  constructor() {
    makeAutoObservable(this)

    this.createCards()
    this.pile.shuffle()
  }

  // ====================================================
  // Actions
  // ====================================================
  createCards() {
    for (const rank of Object.values(RANK)) {
      for (const suit of Object.values(SUIT)) {
        const card = new CardModel({
          rank: rank as RANK,
          suit: suit as SUIT,
          isTurned: false,
        })

        this.pile.add(card)
      }
    }
  }

  turnCard = () => {
    const card = this.pile.pop()
    if (card) {
      card.isTurned = true
      this.pileTurned.add(card)
      return
    }

    this.resetPile()
  }

  resetPile = () => {
    this.pile.cards.replace(this.pileTurned.cards)
    this.pileTurned.clear()
    this.pile.cards.forEach((card) => card.reveal())
  }
}
