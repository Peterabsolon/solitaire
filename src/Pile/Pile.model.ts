import { action, computed, IObservableArray, observable } from "mobx"

import { CardModel, RANK_VALUES } from "../Card"
export class PileModel {
  // ====================================================
  // Model
  // ====================================================
  cards: IObservableArray<CardModel> = observable([])

  // ====================================================
  // Computed
  // ====================================================
  @computed get hasCards() {
    return this.cards.length > 0
  }

  // Array length needs to be accessed in order for MobX to track it and hence update this view when it changes.
  // This seems like a weird quirk, but not really once you're familiar with how MobX reactivity engine works.
  @computed get lastCard(): CardModel | undefined {
    return this.hasCards ? this.cards[this.cards.length - 1] : undefined
  }

  @computed get firstCard(): CardModel | undefined {
    return this.hasCards ? this.cards[0] : undefined
  }

  // ====================================================
  // Actions
  // ====================================================
  @action add = (card: CardModel): void => {
    this.cards.push(card)
  }

  @action pop = (): CardModel | undefined => {
    return this.cards.pop()
  }

  @action remove = (card: CardModel): void => {
    this.cards.remove(card)
  }

  @action clear = () => {
    this.cards.clear()
  }

  // http://en.wikipedia.org/wiki/Fisher-Yates_shuffle#The_modern_algorithm
  @action shuffle = () => {
    for (let i = this.cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))

      const temp = this.cards[i]
      this.cards[i] = this.cards[j]
      this.cards[j] = temp
    }
  }

  @action canAdd = (card: CardModel) => {
    if (!this.lastCard) {
      return true
    }

    const cardRank = RANK_VALUES.indexOf(card.rank)
    const cardLastRank = RANK_VALUES.indexOf(this.lastCard.rank)

    const isColorDifferent = card.isBlack !== this.lastCard.isBlack
    const isRankBelow = cardRank === cardLastRank - 1

    return isColorDifferent && isRankBelow
  }

  @action turnLastCard = () => {
    if (!this.lastCard?.isTurned) {
      this.lastCard?.turn()
    }
  }
}
