import { IObservableArray, makeAutoObservable, observable } from "mobx"
import { CardModel, CardModelProps } from "../Card"

export class DeckModel {
  cards: IObservableArray<CardModel> = observable([])

  constructor(cards: CardModelProps[]) {
    makeAutoObservable(this)

    this.cards.replace(cards.map((card) => new CardModel(card)))
  }
}
