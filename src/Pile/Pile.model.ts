import { IObservableArray, makeAutoObservable, observable } from "mobx"

import { CardModel } from "../Card"

export class PileModel {
  // ====================================================
  // Model
  // ====================================================
  cards: IObservableArray<CardModel> = observable([])

  constructor() {
    makeAutoObservable(this)
  }

  // ====================================================
  // Computed
  // ====================================================
  get lastCard(): CardModel | undefined {
    // Array length needs to be accessed in order for MobX to track it and hence update this view when it changes.
    // This seems like a weird quirk, but not really once you're familiar with how MobX reactivity engine works.
    return this.cards.length ? this.cards[this.cards.length - 1] : undefined
  }

  // ====================================================
  // Actions
  // ====================================================
  add = (card: CardModel): void => {
    this.cards.push(card)
  }

  pop = (): CardModel | undefined => {
    return this.cards.pop()
  }

  remove = (card: CardModel): void => {
    this.cards.remove(card)
  }

  // http://en.wikipedia.org/wiki/Fisher-Yates_shuffle#The_modern_algorithm
  shuffle = () => {
    for (let i = this.cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))

      const temp = this.cards[i]
      this.cards[i] = this.cards[j]
      this.cards[j] = temp
    }
  }

  canAdd = (card: CardModel) => {
    const isColorDifferent = card.isBlack !== this.lastCard?.isBlack
    const result = isColorDifferent

    console.log("result", result)

    return result
  }

  turnLastCard = () => {
    this.lastCard?.turn()
  }
}
