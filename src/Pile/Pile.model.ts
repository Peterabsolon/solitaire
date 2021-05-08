import { IObservableArray, makeAutoObservable, observable } from "mobx"

import { CardModel, Rank } from "../Card"

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
  get hasCards() {
    return this.cards.length > 0
  }

  // Array length needs to be accessed in order for MobX to track it and hence update this view when it changes.
  // This seems like a weird quirk, but not really once you're familiar with how MobX reactivity engine works.
  get lastCard(): CardModel | undefined {
    return this.hasCards ? this.cards[this.cards.length - 1] : undefined
  }

  get firstCard(): CardModel | undefined {
    return this.hasCards ? this.cards[0] : undefined
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

  clear = () => {
    this.cards.clear()
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
    if (!this.lastCard) {
      return true
    }

    const cardRank = Object.values(Rank).indexOf(card.rank)
    const cardLastRank = Object.values(Rank).indexOf(this.lastCard.rank)

    const isColorDifferent = card.isBlack !== this.lastCard.isBlack
    const isRankAbove = cardRank + 1 === cardLastRank

    return isColorDifferent && isRankAbove
  }

  turnLastCard = () => {
    this.lastCard?.turn()
  }
}
