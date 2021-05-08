import { IObservableArray, makeAutoObservable, observable } from "mobx"

import { CardModel, Rank, Suit } from "../Card"
import { PileModel } from "../Pile"

export class DeckModel {
  pile = new PileModel()
  pileTurned = new PileModel()

  constructor() {
    makeAutoObservable(this)

    this.createCards()
    this.pile.shuffle()
  }

  createCards() {
    for (const rank of Object.values(Rank)) {
      for (const suit of Object.values(Suit)) {
        const card = new CardModel({
          rank: rank as Rank,
          suit: suit as Suit,
        })

        this.pile.add(card)
      }
    }
  }

  turnCard() {
    const card = this.pile.pop()
    if (card) {
      this.pileTurned.add(card)
    }
  }
}
