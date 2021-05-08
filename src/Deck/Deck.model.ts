import { makeAutoObservable } from "mobx"

import { CardModel, Rank, Suit } from "../Card"
import { PileModel } from "../Pile"

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
    for (const rank of Object.values(Rank)) {
      for (const suit of Object.values(Suit)) {
        const card = new CardModel({
          rank: rank as Rank,
          suit: suit as Suit,
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

    this.pile.cards.replace(this.pileTurned.cards)
    this.pileTurned.clear()
  }
}
