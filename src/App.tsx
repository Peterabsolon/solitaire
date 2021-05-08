import { IObservableArray, makeAutoObservable, observable } from "mobx"
import "./App.css"

import { CardModel, CardModelProps, Rank, Suit } from "./Card"

class Deck {
  cards: IObservableArray<CardModel> = observable([])

  constructor(cards: CardModelProps[]) {
    makeAutoObservable(this)

    this.cards.replace(cards.map((card) => new CardModel(card)))
  }
}

const deck = new Deck([
  { rank: Rank.King, suit: Suit.Clubs },
  { rank: Rank.Queen, suit: Suit.Diamonds },
])

console.log("deck", deck)

function App() {
  return <div>App</div>
}

export default App
