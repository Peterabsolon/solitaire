import { IObservableArray, makeAutoObservable, observable } from "mobx"
import { CardModel, CardModelProps } from "../Card"

export class PileModel {
  cards: IObservableArray<CardModel> = observable([])

  constructor() {
    makeAutoObservable(this)
  }

  get topCard(): CardModel | undefined {
    // Array length needs to be accessed in order for MobX to track it and hence update this view when it changes.
    // This seems like a weird quirk, but not really once you're familiar with how MobX reactivity engine works.
    return this.cards.length ? this.cards[0] : undefined
  }

  add = (card: CardModel): void => {
    this.cards.push(card)
  }

  pop = (): CardModel | undefined => {
    return this.cards.pop()
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
}
