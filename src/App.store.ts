import { createContext, useContext } from "react"
import { IObservableArray, makeAutoObservable, observable } from "mobx"
import { times } from "lodash"

import { CardModel } from "./Card"
import { DeckModel } from "./Deck"
import { FoundationModel } from "./Foundation"
import { PileModel } from "./Pile"

class AppStore {
  // ====================================================
  // Model
  // ====================================================
  // The playing deck from which cards are turned and board initialized
  deck = new DeckModel()

  // Foundations are the 4 piles on the top-right
  foundations: IObservableArray<FoundationModel> = observable(times(4).map(() => new FoundationModel({}))) // prettier-ignore

  // Standard 7 piles at the bottom
  piles: IObservableArray<PileModel> = observable(times(7).map(() => new PileModel({})))

  constructor() {
    makeAutoObservable(this)
  }

  // ====================================================
  // Computed
  // ====================================================
  get hasWon() {
    return this.foundations.every((foundation) => foundation.isDone)
  }

  // ====================================================
  // Actions
  // ====================================================
  // TODO: add test
  handlePileCardClick = (cards: CardModel[], pile: PileModel) => {
    console.log("TODO: automatically add to correct pile/foundation")
    return
  }

  handleDropFromDeck = (target: PileModel) => {
    const card = this.deck.pileTurned.lastCard

    if (card && target && target.canAdd(card)) {
      target.add(card)
      this.deck.pileTurned.remove(card)
    }
  }

  handleDropToPile = (
    fromDeck: boolean,
    cardIndex: number,
    pileIndexFrom: number,
    pileIndexTo: number
  ) => {
    const pile = this.piles[pileIndexTo]

    if (fromDeck) {
      this.handleDropFromDeck(pile)
      return
    }

    const sourcePile = this.piles[pileIndexFrom]
    const sourceCards = sourcePile.cards
    const cards = sourceCards.slice(cardIndex, sourceCards.length)

    if (cards.length && pile && pile.canAdd(cards[0])) {
      cards.forEach((card) => {
        pile.add(card)
        sourcePile.remove(card)
      })

      sourcePile.turnLastCard()
    }
  }

  handleDropToFoundation = (
    fromDeck: boolean,
    cardIndex: number,
    pileIndex: number,
    foundationIndex: number
  ) => {
    const foundation = this.foundations[foundationIndex]

    if (fromDeck) {
      this.handleDropFromDeck(foundation)
      return
    }

    const pile = this.piles[pileIndex]
    const card = pile.cards[cardIndex]

    if (card && foundation && foundation.canAdd(card)) {
      foundation.add(card)
      pile.remove(card)
      pile.turnLastCard()
    }
  }

  initialize = () => {
    times(7).forEach((_, pileIndex) => {
      times(pileIndex + 1).forEach((_, cardIndex) => {
        const card = this.deck.pile.pop()
        const isLast = cardIndex === pileIndex

        if (card) {
          if (isLast) {
            card.turn()
          }

          this.piles[pileIndex].add(card)
        }
      })
    })
  }
}

const store = new AppStore()

const storeContext = createContext(store)

export const useStore = () => useContext(storeContext)
